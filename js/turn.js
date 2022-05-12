// Lanzar dado
function throwDice(){
    let random, num;
    let elem = document.querySelector('#dice');
    
    function randomDice(e){
        random = setInterval(function(){
            num = Math.ceil(Math.random()*9);if(num===0){num=1;}
            e.style.backgroundImage = "url('images/tabletop/dice/"+num+".png')";
        },50);
    }
    randomDice(elem);
    let audio = new Audio('sounds/effects/dado.mp3');audio.play();
    setTimeout(function(){
        clearInterval(random);
        setTimeout(function(){moveAvatar(num);},500)
    }, 3000);
}

// Mover avatar
function moveAvatar(numDice){
    let avatar = document.querySelector(".avatar#_"+(currentTurn+1));
    avatar.classList.remove("stop"); // Agrandar avatar

    let playerPosition =  position[currentTurn];
    playerPosition = position[currentTurn] = playerPosition + numDice;

    setTimeout(function(){
        let numBox = document.querySelectorAll(".box").length;
        if(playerPosition > numBox){
            playerPosition = numBox - playerPosition;
        }

        avatarAnimation('disappear', avatar);
        setTimeout(function(){
            document.querySelector('.box#_' + playerPosition).appendChild(avatar);
            avatarAnimation('appear', avatar);
        }, 1000);
        
        setTimeout(function(){
            selectCard();
            avatar.classList.add("stop"); // Empequeñecer avatar
        }, 2500);
    }, 1000);
}
// Aparicion/Desaparicion del avatar
function avatarAnimation (animation, avatar){
    avatar.style.backgroundImage = "url('images/player/" + 
                activeTeams[currentTurn].split(':')[0] + "/" + animation + ".gif?a=" + Math.random(); + "')";
    if(animation === "appear"){
        setTimeout(function(){
            if(document.querySelector('.box#_'+position[currentTurn]).classList.contains("hidden")){
                document.querySelector('.box#_'+position[currentTurn]).classList.remove("hidden");
            }
        },1000);
    }
}
// Cambiar turno + checkeo si ha acabado el juego
function changeTurn(){
    let end = false;
    if(document.body.classList.contains("suddenDeath")){ // Muerte subita
        if((currentTurn+1)<activeTeamsMS.length){
            currentTurn++;
            let audio = new Audio('sounds/effects/principioTurno.mp3');audio.play();
            document.querySelector('#teamName').innerHTML = activeTeamsMS[currentTurn].split(':')[1];
            document.querySelectorAll('header .avatar').forEach(elem => {
                elem.src = "images/player/" + activeTeamsMS[currentTurn].split(':')[0] + "/Idle.png";
            });
        }else{
            currentTurn = 0;
            gameEnd();
        }
    }else{ // Cambio normal
        if((currentTurn+1)<activeTeams.length){
            currentTurn++;
        }else{
            if(document.querySelector("#globalTime").innerText === "00 : 00 : 00"){ // Acaba el tiempo y turno
                end = true;
                gameEnd();
            }else{
                currentTurn = 0;
                roundsGame++;
            }
        }
        if(!end){
            let audio = new Audio('sounds/effects/principioTurno.mp3');audio.play();
            document.querySelector('#teamName').innerHTML = activeTeams[currentTurn].split(':')[1];
            document.querySelectorAll('header .avatar').forEach(elem => {
                elem.src = "images/player/" + activeTeams[currentTurn].split(':')[0] + "/Idle.png";
            });
            if(!rebound){
                rebound = true;
                reboundTeam = undefined;
            }
            diceOff = false;
        }
    }
}

// Eventos de tarjeta
function selectCard(){
    let card = document.querySelector("#card");
    currentBox = document.querySelector('.box#_'+position[currentTurn]).className.replace(/(box|\s|c_\d+)/g, "");
    /** TRUCADO PARA QUE SALGA UN TIPO DE PREGUNTA CONCRETO *
    currentBox = "cultjapo";
    /**/
    if(currentBox !== "random"){preloadQuestions();}
    card.style.backgroundImage = "url('images/cards/title_"+currentBox+".png')";
    card.className = currentBox;    
    if(currentBox === "vf"){
        setTimeout(function(){
                card.innerHTML = "<div class='vfTitle'>" + questions[currentBox].title + "</div>";
        },100);
    }
}

// Fin del juego
function gameEnd(){
    activeTeamsMS = [];

    //Ordernar equipos por puntos
    for(let i = 0 ; i < (activeTeams.length-1) ; i++){
        for(let j = i+1 ; j < activeTeams.length; j++){
            if(parseInt(score[i]) < parseInt(score[j])){
                // Ordenar array de puntos
                let auxScore = score[i];
                score[i] = score[j];
                score[j] = auxScore;
                // Ordenar array de jugadores
                let auxTeam = activeTeams[i];
                activeTeams[i] = activeTeams[j];
                activeTeams[j] = auxTeam;
            }
        }
    }
    // Ver is hay empate para la muerte subita
    if(score.filter((elem) => (elem === score[0])).length > 1){
        for(let i = 0; i <  activeTeams.length; i++){
            if(i < score.filter((elem) => (elem === score[0])).length){
                activeTeamsMS[i] = activeTeams[i];
            }else{
                document.querySelector('.tabletop #' + activeTeams[i].split(':')[0]).classList.add("disabled");
            }
        }
        if(!document.body.classList.contains("suddenDeath")){ suddenDeath();}
        else{
            let audio = new Audio('sounds/effects/principioTurno.mp3');audio.play();
            document.querySelector('#teamName').innerHTML = activeTeamsMS[currentTurn].split(':')[1];
            document.querySelectorAll('header .avatar').forEach(elem => {
                elem.src = "images/player/" + activeTeamsMS[currentTurn].split(':')[0] + "/Idle.png";
            });
        }
        roundsMS++;
    }else{
        setTimeout(function(){showScores();}, 100);
    }
}
// Muerte subita
function suddenDeath(){
    document.querySelectorAll("#box-content .row").forEach( box => {
        box.remove();
    });
    document.querySelector("#dice").remove();
    document.body.classList.add("suddenDeath");
    let audio = new Audio('sounds/effects/muerteSubita.mp3');audio.play();
    currentBox = "pregunta"; rebound = false; currentTurn = 0;
    preloadQuestions();
    setTimeout(function(){
        card.style.backgroundImage = "url('images/cards/title_"+currentBox+".png')";
        card.classList.remove("hidden");
        card.className = currentBox;
        let audio = new Audio('sounds/effects/principioTurno.mp3');audio.play();
        document.querySelector('#teamName').innerHTML = activeTeamsMS[currentTurn].split(':')[1];
        document.querySelectorAll('header .avatar').forEach(elem => {
            elem.src = "images/player/" + activeTeamsMS[currentTurn].split(':')[0] + "/Idle.png";
        });
    }, 3000);
}
// Fin del juego
function showScores(){
    document.body.className = "fade_out";
    setTimeout(function(){
        document.body.innerHTML = getMain();
        document.querySelector("#view").innerHTML = getScore();
        setTimeout(function(){
            document.body.className = "fade_in";
            loadScoreTable();
        },100);
    },1000);
}
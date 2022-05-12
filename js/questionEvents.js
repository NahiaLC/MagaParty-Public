let questions = {"pregunta":[],"reaper":[],"musica":[],"silueta":[],
                        "mimica":[],"vf":[],"cultjapo":[],"tabu":[]}
let usedQuestions = {"pregunta":[0],"reaper":[0],"musica":[0],"silueta":[0],
                        "mimica":[0],"vf":[0],"cultjapo":[0],"tabu":[0]}
let audioMusica;

function getQuestion(){
    let card = document.querySelector("#card." + currentBox);
    let consolAnswer;

    let numQuestions = currentBox === "vf" ?
                        (Object.keys(questions[currentBox]).length -1 ) :
                        Object.keys(questions[currentBox]).length;
    let usedQ = usedQuestions[currentBox];
    if(usedQ.length > numQuestions){ usedQ = [0]; }
    
    let questionID = randomQuestion(numQuestions, usedQ);
    usedQuestions[currentBox].push(questionID);
    /** TRUCADO PARA QUE SALGA UNA PREGUNTA CONCRETA *
    questionID = 39;
    /**/

    switch(currentBox){
        case "pregunta":
        case "reaper":
        case "musica":
        case "vf":
        case "cultjapo":
            createElem("question", null); createElem("answer", null);
            //Mostar en consola
            consolAnswer = questions[currentBox][questionID].a;
            //Mostar en pantalla
            card.querySelector("#question").innerHTML = questions[currentBox][questionID].q;
            if(currentBox === "vf"){
                card.querySelector("#answer").innerHTML = "<div class='Verdadero'>Verdadero</div>" +
                                                            "<div class='Falso'>Falso</div>";
            } else{
                if(currentBox === "musica"){
                    audioMusica = new Audio('sounds/musica/' + questionID + '.mp3');audioMusica.play();
                }
                card.querySelector("#answer").innerHTML = consolAnswer;
            }
            break;
        case "silueta":
        case "mimica":
            createElem("image", null); createElem("answer", null);
            if(currentBox === "silueta"){
                card.querySelector("#image").classList.add("inBlack");
            }else{
                if(document.querySelector("#hideCard").classList.contains("hidden")){
                    document.querySelector("#hideCard").classList.remove("hidden");
                }
            }
            //Mostar en consola
            consolAnswer = questions[currentBox][questionID].a +
                                " // " + questions[currentBox][questionID].o;
            //Mostar en pantalla
            card.querySelector("#image").innerHTML ="<img src='images/" + currentBox + "/" + questionID +".png'" + 
                                                        "alt='" + questions[currentBox][questionID].a + "'/>";
            card.querySelector("#answer").innerHTML = questions[currentBox][questionID].a + "<br>" +
                                                        questions[currentBox][questionID].o;
            break;
        case "tabu":
            createElem("answer", null); createElem("options", null);
            if(document.querySelector("#hideCard").classList.contains("hidden")){
                document.querySelector("#hideCard").classList.remove("hidden");
            }
            //Mostar en consola
            consolAnswer = questions[currentBox][questionID].a;
            //Mostar en pantalla
            card.querySelector("#answer").innerHTML = consolAnswer;
            card.querySelector("#options").innerHTML = "<div class='o1'>" + questions[currentBox][questionID].o1 + "</div>" +
                                                        "<div class='o2'>" + questions[currentBox][questionID].o2 + "</div>" +
                                                        "<div class='o3'>" + questions[currentBox][questionID].o3 + "</div>" +
                                                        "<div class='o4'>" + questions[currentBox][questionID].o4 + "</div>" +
														"<div class='o5'>" + questions[currentBox][questionID].o5 + "</div>";
            break;
    }
    //Mostar en consola
    console.log('%cRESPUESTA (' + questionID + '):', 'font-size: 25px; text-decoration: underline;');
    console.log('%c ' + consolAnswer, 'font-size: 25px; font-weight: bold');
    
}
function checkAnswer(answer){
    // Asignacion de equipo para puntos
    let currentTeam;
    if(document.body.classList.contains("suddenDeath")){  // Equpo muerte subita
        currentTeam = activeTeams.indexOf(activeTeamsMS[currentTurn]);
    }else if(reboundTeam !== undefined){
        currentTeam = reboundTeam; // Equipo rebote
    }else{
        currentTeam = currentTurn; // Equipo normal
    }                       
    
    stopCrono();
    // NO muerte subita
    if(!document.body.classList.contains("suddenDeath")){
        if(answer === "incorrect" && rebound && (currentBox !== "mimica" && currentBox !== "vf" && 
                        currentBox !== "tabu" && currentBox !== "reaper")){ // Rebote
            reboundEvent();
        }else{
            answer === "correct" && 
            (currentBox === "reaper" || currentBox==="cultjapo" || currentBox==="vf") ?
                showAnswerSetScores(answer, currentTeam, 2) : // 2 puntos
                showAnswerSetScores(answer, currentTeam, 1); // 1 punto
        }
    }else{ // Muerte subita
        showAnswerSetScores(answer, currentTeam, 1);
    }
}
function reboundEvent(){
    parseInt(document.querySelector("#crono").innerText) === 0 ?
            answerAudio = new Audio('sounds/effects/timeout.mp3') :
            answerAudio = new Audio('sounds/effects/fallo.mp3');
    answerAudio.play();
    //Ordernar equipos por puntos para hacer el rebote al que menos tenga
    let teams = activeTeams.slice();
    let points = score.slice();
    // Por flujo de turno
    for(let i = 0; i < currentTurn; i++){
        let auxTeam = teams.shift();
        teams.push(auxTeam);
        let auxScore = points.shift();
        points.push(auxScore);    
    }
    // Por puntos para hacer el rebote al que menos tenga
    for(let i = 0 ; i < (teams.length-1) ; i++){
        for(let j = i+1 ; j < teams.length; j++){
            if(parseInt(points[i]) > parseInt(points[j])){
                // Ordenar array de puntos
                let auxScore = points[i];
                points[i] = points[j];
                points[j] = auxScore;
                // Ordenar array de jugadores
                let auxTeam = teams[i];
                teams[i] = teams[j];
                teams[j] = auxTeam;
            }
        }
    }
    // Rebote al equipo que menos puntos tenga (no actual)
    currentTurn === activeTeams.indexOf(teams[0]) ?
        reboundTeam = activeTeams.indexOf(teams[1]) :
        reboundTeam = activeTeams.indexOf(teams[0]) ;

    createElem("rebound", document.querySelector("#card").lastElementChild);
    setTimeout(function(){
        audio = new Audio('sounds/effects/rebote.mp3');audio.play();
        document.querySelector('#rebound').innerHTML =
                "<img src='images/player/" + activeTeams[reboundTeam].split(':')[0] + "/appear.gif?a=" + Math.random() + "'" +
                    "alt='" + activeTeams[reboundTeam].split(':')[0] + "'/>";
        setTimeout(function(){countDown.start(5*1000);}, 1500);
    }, 2000);
    rebound = false;
}
function showAnswerSetScores(answer, team, points){
    let card = document.querySelector("#card");
    card.classList.add(answer);

    if(!document.querySelector("#hideCard").classList.contains("hidden")){
        document.querySelector("#hideCard").classList.add("hidden");
    }
    if(answer === "correct"){
        let audio = new Audio('sounds/effects/acierto.mp3');audio.play();
        score[team] += points;
        document.querySelector("#"+activeTeams[team].split(":")[0]+" .value").innerHTML = score[team];
        setTimeout(function(){
            let audio = new Audio('sounds/effects/sumarPunto.mp3');audio.play();
        },3000);
    }else{
        let audio;
        parseInt(document.querySelector("#crono").innerText) === 0 ?
            audio = new Audio('sounds/effects/timeout.mp3') :
            audio = new Audio('sounds/effects/fallo.mp3');
        audio.play();
        if(currentBox === "reaper" && score[team] > 0){
            score[team] -= 1;
            document.querySelector("#"+activeTeams[team].split(":")[0]+" .value").innerHTML = score[team];
            setTimeout(function(){
                let audio = new Audio('sounds/effects/restarPunto.mp3');audio.play();
            },2000);
        }
    }
    switch(currentBox){
        case "musica":
            audioMusica.pause();
            audioMusica.currentTime = 0;
            break;
        case "silueta":
            card.querySelector("#image").classList.remove("inBlack");
            break;
    }
}

// Precargar preguntas de golpe la primera vez que se desbloaque prueba
function preloadQuestions(){
    let from;
    if(questions[currentBox].length === 0){
        from = "fromSet_"+currentBox;
        window.api.send("toGetJSONS", {file: currentBox, pipe: currentBox});
        window.api.receive(from, (data) => {
            questions[currentBox] = JSON.parse(data);
        });
    }
}

function createElem(elem, reference){
    let newDiv = document.createElement("div");
    newDiv.id = elem;
    document.querySelector("#card").insertBefore(newDiv, reference);
}
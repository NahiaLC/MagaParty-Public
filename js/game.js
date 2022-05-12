let activeTeams = [], score = [], position = [], activeTeamsMS = [];
let currentBox, reboundTeam;
let currentTurn = 0; roundsGame = 1; roundsMS = 0;
let rebound = true, hiddenBox = false;

// Cargar los jugadores y el tablero
function loadGame(){
    let boxes = [];

	window.api.send("toGetJSONS", {file: "gameInitialSettings", pipe: "gameLoad"});
	
	window.api.receive("fromSetJSONS", (data) => {
        let json = JSON.parse(data);
        
        // Casillas
        Object.entries(json.tabletop).forEach(([key, value]) => {
            boxes.push(key+':'+value);
        });

        // Jugadores
        if(activeTeams.length === 0){
            let i = 0;
            Object.entries(json.team.name).forEach(([key, value]) => {
                if(i >= parseInt(json.team.num)){
                    document.querySelectorAll('.tabletop .team')[i].classList.add("disabled");
                    document.querySelectorAll('#avatarStart .avatar')[i].classList.add("disabled");
                }else{ 
                    activeTeams.push(key+':'+value);
                    position.push(0);
                    score.push(0)
                }
                i++;
            });
        }

    });
    
    setTimeout(function(){
        setTabletop(boxes);
    }, 100);
    setTimeout(function(){
        document.querySelector(".points").classList.remove("zoom_out");
        document.querySelector(".points").classList.add("zoom_in");
    }, 1500);
    setTimeout(function(){
        document.querySelector("#dice").className = "zoom_in";
    }, 3000);
}

function startGame(){
    let audio = new Audio('sounds/effects/principioTurno.mp3');audio.play();
    document.querySelector('#teamName').innerHTML = activeTeams[currentTurn].split(':')[1];
    document.querySelectorAll('header .avatar').forEach(elem => {
        elem.src = "images/player/" + activeTeams[currentTurn].split(':')[0] + "/Idle.png";
    });
}
// Fin del juego mostrar clasificacion
function loadScoreTable(){
    let roundGameSting, roundMSting;
    let scoreTable = document.querySelector("#scoreTable .score");
    roundsGame === 1 ? roundGameSting = "ronda" : roundGameSting = "rondas";
    roundsMS === 1 ? roundMSting = "ronda" : roundMSting = "rondas";
    if(roundsMS !== 0){
        scoreTable.innerHTML = "<div id='title'>" +
                                    "Resultados de " + roundsGame + " " + roundGameSting + " en juego" +
                                    "<br>y " + roundsMS + " " + roundMSting + " en muerte súbita" +
                                "</div>";
    }else{
        scoreTable.innerHTML = "<div id='title'>" +
                                    "Resultados de " + roundsGame + " " + roundGameSting +
                                "</div>";
    }
    activeTeams.forEach((team, index) => {
        scoreTable.innerHTML += "<div id='" + team.split(":")[0] + "'>" +
                                    parseInt(index+1) + ". " +
                                    "<img src='images/player/" + team.split(':')[0] + "/appear.gif'" +
                                        " alt='avatar_" + team.split(":")[0] + "' />" +  team.split(":")[1] +
                                    "<div class='points'>" + score[index] + "pts" + "</diiv>" +
                                "</div>";
    });
}
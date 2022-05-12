/* http://keycode.info/ -> pagina donde mirar el valor de la tecla */

document.addEventListener("keydown", keyDown, false);
let start=false, diceOff=false; hideCard = false;

function keyDown(e) {
	let audio;
	let card = document.querySelector("#card");

	if(document.querySelector("#game") !== null){
		if(e.ctrlKey){
			switch(e.keyCode){
				case 49: // ctrl+1 -> Sumar al jugador 1
					score[0] += 1;
					document.querySelector("#red .value").innerHTML = score[0];
					break;
				case 50: // ctrl+2 -> Sumar al jugador 2
					score[1] += 1;
					document.querySelector("#blue .value").innerHTML = score[1];
					break;
				case 51: // ctrl+3 -> Sumar al jugador 3
					score[2] += 1;
					document.querySelector("#green .value").innerHTML = score[2];
					break;
				case 52: // ctrl+4 -> Sumar al jugador 4
					score[3] += 1;
					document.querySelector("#yellow .value").innerHTML = score[3];
					break;
				case 53: // ctrl+5 -> Sumar al jugador 5
					score[4] += 1;
					document.querySelector("#cian .value").innerHTML = score[4];
					break;
				case 54: // ctrl+6 -> Sumar al jugador 6
					score[5] += 1;
					document.querySelector("#pink .value").innerHTML = score[5];
					break;
			}
		}else if(e.shiftKey){
			switch(e.keyCode){
				case 49: // shif+1 -> Restar al jugador 1
					if(score[0] > 0){
						score[0] -= 1;
						document.querySelector("#red .value").innerHTML = score[0];
					} 
					break;
				case 50: // shif+2 -> Restar al jugador 2
					if(score[1] > 0){
						score[1] -= 1;
						document.querySelector("#blue .value").innerHTML = score[1];
					} 
					break;
				case 51: // shif+3 -> Restar al jugador 3
					if(score[2] > 0){
						score[2] -= 1;
						document.querySelector("#green .value").innerHTML = score[2];
					} 
					break;
				case 52: // shif+4 -> Restar al jugador 4
					if(score[3] > 0){
						score[3] -= 1;
						document.querySelector("#yellow .value").innerHTML = score[3];
					} 
					break;
				case 53: // shif+5 -> Restar al jugador 5
					if(score[4] > 0){
						score[4] -= 1;
						document.querySelector("#cian .value").innerHTML = score[4];
					} 
					break;
				case 54: // shif+6 -> Restar al jugador 6
					if(score[5] > 0){
						score[5] -= 1;
						document.querySelector("#pink .value").innerHTML = score[5];
					} 
					break;
			}
		}else{
			switch (e.keyCode){
				case 83: // S -> Start reloj principal
					if(!start && document.querySelectorAll("section.tabletop").length > 0){
						let audio = new Audio('sounds/effects/principioJuego.mp3');audio.play();
						start=true;
						window.api.send("toGetJSONS", {file: "gameInitialSettings", pipe: "timeLoad"});
						window.api.receive("fromSetTime", (data) => {
							let json = JSON.parse(data);                    
							setTimeout(function(){
								setGlobalTime(json.gameTime);
								startGame();
							}, 5000);
						});
					}
					break;
				case 68: // D -> Tirar dado
					if((start)&&(!diceOff)){
						diceOff=true;
						throwDice();
					}
					break;
				case 13: // Enter -> Control de tarjetas (Portada -> Pregunta -> Qitar...)
					if(card.style.backgroundImage.includes('title_')){ // En portada
						if(currentBox === "random"){ 
							randomBox(card);
						}else{
							setTimeout(function(){
								if(currentBox === "vf"){
									card.querySelector(".vfTitle").remove();
								}
								card.style.backgroundImage = "url('images/cards/bg_"+currentBox+".png')";
								getQuestion();
							},100);
						}
						if(currentBox !== 'mimica' && currentBox !== 'tabu'
							&& currentBox !== 'vf' && currentBox !== 'random'){
							startCrono();
						}
					}else if(card.style.backgroundImage.includes('bg_')  // En pregunta + respuesta
							&& card.classList.value.match(/correct/)){
						if(!document.querySelector("#hideCard").classList.contains("hidden")){
							document.querySelector("#hideCard").classList.add("hidden");
						}
						if(document.body.classList.contains("suddenDeath")){
							card.style.backgroundImage = "url('images/cards/title_"+currentBox+".png')";
							card.className = "pregunta";
						}else{
							card.className = "hidden";
						}
						card.innerHTML = "";
						document.querySelector("#crono").style.color = "black";
						document.querySelector("#crono .sec").innerText = "00";
						document.querySelector("#crono .miliSec").innerText = "00";
						changeTurn(); console.clear();
					}
					break;
				case 32: // Espacio -> Start/Stop contrareloj
					if(card.style.backgroundImage.includes('bg_')){
						pauseResumeCrono()
					}
					break;
				case 72: // H -> Poner/Quitar trajeta no mires
					let hideCard = document.querySelector("#hideCard");
					if(hideCard.classList.contains("hidden")){
						hideCard.classList.remove("hidden");
						if(currentBox === "mimica" && (countDown === undefined || !running)){
							startCrono();
						}
					}else{
						hideCard.classList.add("hidden");
						if(currentBox === "tabu" && (countDown === undefined || !running)){
							startCrono();
						}
					}
					break;
				case 78: // N -> Respuesta incorrecta
					if(card.style.backgroundImage.includes('bg_')){
						checkAnswer("incorrect");
					}
					break;
				case 89: // Y -> Respuesta correcta
					if(card.style.backgroundImage.includes('bg_')){
						checkAnswer("correct");
					}
					break;
				case 49: // 1 -> Seleccionar Verdadero en vf
					if(card.style.backgroundImage.includes('bg_vf')){
						let option = card.querySelector("#answer");
						option.querySelector(".Verdadero").classList.add("selected");
						if(option.querySelector(".Falso").classList.contains("selected")){
							option.querySelector(".Falso").classList.remove("selected");
						}
						stopCrono()
					}
					break;
				case 50: // 2 -> Seleccionar Falso en vf
					if(card.style.backgroundImage.includes('bg_vf')){
						let option = card.querySelector("#answer");
						option.querySelector(".Falso").classList.add("selected");
						if(option.querySelector(".Verdadero").classList.contains("selected")){
							option.querySelector(".Verdadero").classList.remove("selected");
						}
						stopCrono()
					}
					break;
				case 84: // T -> Empezar crono vf
					if(card.style.backgroundImage.includes('bg_vf') && (countDown===undefined || !running)){
						startCrono();
					}
					break;
				case 67:  // C -> Cri, Cri, Cri
					audio=new Audio('./sounds/effects/CriCriCri.mp3');audio.play();
					break;
				case 80:  // P -> Penny, Penny, Penny
					audio=new Audio('./sounds/effects/PennyPennyPenny.mp3');audio.play();
					break;
				case 81: // Q -> Silence
					audio=new Audio('./sounds/effects/silence.mp3');audio.play();
					break;
				case 88: // X -> Nein, Nein, Nein
					audio=new Audio('./sounds/effects/neinHitler.mp3');audio.play();
					break;
				case 90: // Z -> Zasca
					audio=new Audio('./sounds/effects/zasca.mp3');audio.play();
					break;
			}
		}
	}
}
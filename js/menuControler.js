let audio;
window.onload = function() {
	document.querySelector('#index').innerHTML = getMain();
	document.querySelector('#view').innerHTML = getMenu();
	audio = new Audio("./sounds/effects/index.mp3");audio.play();
}

// Funiones principales del menu

function goTo(event){
	let view, 
		container = "#view", 
		ok = true;
	switch (event){
		case 'menu':
			start = false; diceOff = false;
			activeTeams = [], position = [], score = [], currentTurn = 0;
			if(!document.querySelector("header .logo")){
				view = getMain();
				container = "#index"
			}else{
				view = getMenu();
			}
			audio.play();
		break;
		case 'help':
			view = getHelp();
		break;
		case 'setGame':
			view = getSetGame();
		break;
		case 'play':
			if(checkSettings()){
				updateJSON();
				hiddenBox = document.querySelector(".switch input").checked;
				view = getGame();
				container = "#index";
				audio.pause(); audio.currentTime = 0;
			}
			else{
				alert('Revisa los datos insertados');
				ok = false;
			}
		break;
		case 'close':
			window.close()
		break;
	}
	if(ok){
		document.querySelector(container).className = "fade_out";
		setTimeout(function(){
			document.querySelector(container).innerHTML = view;
			if(event === "menu" && container === "#index"){
				document.querySelector("#view").innerHTML = getMenu();
			}else if(event === "setGame"){
				loadData();
			}else if(event === "play"){
				loadGame();
			}
			setTimeout(function(){
				document.querySelector(container).className = "fade_in";
			},100);
		},1000);
	}
}

// Funciones como jugar

function move(event){
	let img = document.querySelector('.help-container img');
    let num = parseInt(img.src.split('Help_')[1].split('.png')[0]);
	if((event == 'back' && num > 1)||(event == 'next' && num < 6)){
		event == 'back' ? num-- : num++;
		document.querySelector('.help-container div').className = "zoom_out";
		setTimeout(function(){
			img.src = "images/help/Help_"+num+".png";
			setTimeout(function(){
				document.querySelector('.help-container div').className = "zoom_in";
			},100);
		},500);
		if(num > 1 && num < 6){
			document.querySelector('.left button').disabled = false;
			document.querySelector('.right button').disabled = false;
		}else{
			num === 1 ? 
				document.querySelector('.left button').disabled = true : 
				document.querySelector('.right button').disabled = true;
		}
	}
}

// Funciones Ajustes juego

function loadData(){
	window.api.send("toGetJSONS", {file: "gameInitialSettings", pipe: "load"});
	
	window.api.receive("fromLoadJSONS", (data) => {
		let json = JSON.parse(data);

		// Tiempo juego + numero de equuipos
		document.querySelector('.time #hour').value = json.gameTime.hour;
		document.querySelector('.time #min').value = json.gameTime.min;
		document.querySelector('.numteams input').value = json.team.num;

		// Numero de casillas
		Object.entries(json.tabletop).forEach(([key, value]) => {
			document.querySelector('.'+key+' input').value = value;
		});
		checkNumBox();

		// Nombre de jugadores
		Object.entries(json.team.name).forEach(([key, value]) => {
			document.querySelector('.'+key+' input').value = value;
		});
		checknumTeams();
	});
	addListeners();
}

function addListeners () {
	document.querySelector('.time #hour').addEventListener("change", function() {
		let hour = parseInt(document.querySelector('.time #hour').value);
		if(hour === 0){
			document.getElementById("min").setAttribute("min", 1);
		}else{
			document.getElementById("min").setAttribute("min", 0);
		}
	}, false);
	document.querySelectorAll('.tabletop .box').forEach(elem => {
		elem.addEventListener("change", function() {
			checkNumBox();
		});
	}, false);
	document.querySelector('.numteams input').addEventListener("change", function() {
		checknumTeams();
	}, false);
}

function checkNumBox(){
	let totalbox = 0;
	let elem = document.querySelector('.tabletop .total input');
	document.querySelectorAll('.tabletop .box input').forEach(elem => {
		totalbox += parseInt(elem.value);
	});
	totalbox !== 68 ? elem.style.color = "red" : elem.style.color = "#fff";
	elem.value = totalbox;
}

function checknumTeams(){
	let teams = 0;
	let totalTeams = document.querySelector('.numteams input').value;
	document.querySelectorAll('.teams .team').forEach(elem => {
		teams ++;
		if(totalTeams < teams){
			elem.classList.add("disabled");
			elem.querySelector('input').disabled = true;
		}else{
			elem.classList.remove("disabled");
			elem.querySelector('input').disabled = false;
		}
	});
}

function checkSettings(){
	let ok = true;
	document.querySelectorAll('#setGame input').forEach(elem => {
		if(!elem.checkValidity()){ok = false;}
	})
	if(document.querySelector('.tabletop .total input').value !== "68"){ok = false;}
	return ok;
}

function updateJSON(){
	
	window.api.send("toGetJSONS", {file: "gameInitialSettings", pipe: "update"});
	
	window.api.receive("fromGetJSONS", (data) => {
		let json = JSON.parse(data);
		
		// Tiempo juego + numero de equipos
		json.gameTime.hour = document.querySelector('.time #hour').value
		json.gameTime.min = document.querySelector('.time #min').value
		json.team.num = document.querySelector('.numteams input').value

		// Numero de casillas
		Object.entries(json.tabletop).forEach(([key, value]) => {
			json.tabletop[key] = document.querySelector('.'+key+' input').value;
		});

		// Nombre de jugadores
		Object.entries(json.team.name).forEach(([key, value]) => {
			json.team.name[key] = document.querySelector('.'+key+' input').value;
		});
		window.api.send("toSetJSONS", {file: "gameInitialSettings", data: json});
	});
}
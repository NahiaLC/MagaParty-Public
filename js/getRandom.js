// Numero random de pregunta
function randomQuestion(numQ, usedQ){
    let questionID, ok;

    do{
        ok=true;
        questionID = Math.ceil(Math.random()*numQ);if(questionID===0){questionID=1;}
        for(var i = 1; i <= usedQ.length; i++){
            if(questionID === usedQ[i]){
                ok=false;
                break;
            }
        }
    }while(!ok);

    return questionID;
}
// Prueba random
function randomBox(card){
    let challenges= getChallenges();
    let random, num;
    
    function randomCard(e){
        random = setInterval(function(){
            num = Math.ceil(Math.random()*challenges.length);if(num===challenges.length){num=0;}
            e.style.backgroundImage = "url('images/cards/title_"+challenges[num]+".png')";
        },100);
    }
    randomCard(card);

    setTimeout(function(){
        clearInterval(random);
        currentBox = challenges[num];
        preloadQuestions();
        card.style.backgroundImage = "url('images/cards/title_"+currentBox+".png')";
        card.className = currentBox;
        if(currentBox === "vf"){
            setTimeout(function(){
                    card.innerHTML = "<div class='vfTitle'>" + questions[currentBox].title + "</div>";
            },100);
        }
    }, 3000);
}
function getChallenges(){
    let box = []
    document.querySelectorAll(".box").forEach(t => {
        let challenge = t.className.replace(/(box|hidden|\s|random|reaper|cultjapo|c_\d+)/g, "");	
        if(!box.includes(challenge) && challenge !== ""){
            box.push(challenge)
        }
    })
    if(box.length === 0){box = ["pregunta","mimica","musica","silueta","tabu","vf"]}
    return box;
}
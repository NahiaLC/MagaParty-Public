// Funciones del tiempo global del juego
function setGlobalTime(json) {
    let elem = document.querySelector('#globalTime');
    let h = json.hour, m = json.min;
    let time = h * 60 * 60 + m * 60;
    let deadline = new Date(Date.parse(new Date()) + time * 1000);
    
    elem.innerHTML = ('0'+h).slice(-2)+' : '+('0'+m).slice(-2)+' : 00';
    
    function updateTime() {
        
        let t = getNewTime(deadline);
        if (t.total <= 0) {
            clearInterval(timeinterval);
            elem.innerHTML = '00 : 00 : 00';
        }else{
            if(t.hours===0 && t.minutes < 1){elem.style.color = '#ff0000';}
            elem.innerHTML = ('0'+t.hours).slice(-2)+' : '
                            + ('0'+t.minutes).slice(-2)+' : '
                            + ('0'+t.seconds).slice(-2);
        }
    }

    updateTime();
    let timeinterval = setInterval(updateTime, 1000);
}
function getNewTime(deadline) {
    
    let t = Date.parse(deadline) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
}

// Funciones del contrareloj
let countDown;

function startCrono(){
    countDown = new CountDown();
    running=true;
    if(currentBox==="tabu" || currentBox==="mimica"){
        countDown.start(45*1000);
    }
	else if(currentBox==="vf"){
        countDown.start(5*1000);
    }
    else{
        countDown.start(30*1000);
    }
}
function pauseResumeCrono(){
    running ? countDown.pause() : countDown.resume();
}
function stopCrono(){countDown.stop();}

class CountDown {
    constructor() {
        
        this.timeinterval;

        // Length ms 
        this.TimeOut = 30000;
        // Interval ms
        this.TimeGap = 10;

        this.CurrentTime = (new Date()).getTime();
        this.EndTime = (new Date()).getTime() + this.TimeOut;

        this.GuiTimer = document.querySelector("#crono");
    }

    updateTimer() {
        // Run till timeout
        /*if( this.CurrentTime + this.TimeGap < this.EndTime ) {
            setTimeout( this.updateTimer.bind(this), this.TimeGap );
        }*/
        // Countdown if running
        if( running ) {
            this.CurrentTime += this.TimeGap;
        }
        // Update Gui
        let Time = new Date();
        Time.setTime( this.EndTime - this.CurrentTime );
        let Seconds = Time.getSeconds();
        let MiliSec = Math.round((Time.getMilliseconds()/10).toFixed(2));

        if(Seconds === 10 && MiliSec === 0){this.GuiTimer.style.color = "orange"}
        else if(Seconds === 5 && MiliSec === 0 || Seconds < 5){this.GuiTimer.style.color = "red"}
        this.GuiTimer.innerHTML = '<span class="sec">' 
                                    + ((Seconds < 10 ? '0' : '') + Seconds)
                                + '</span>'
                                + '<div class="miliSec">' 
                                    + ((MiliSec < 10 ? '0' : '') + MiliSec)
                                + '</div>';
        if(Seconds === 0 && MiliSec === 0){checkAnswer("incorrect");}
    }

    start( Timeout ) {
        this.TimeOut = Timeout;
        this.CurrentTime = ( new Date() ).getTime();
        this.EndTime = ( new Date() ).getTime() + this.TimeOut;
        running = true;
        
        this.timeinterval = setInterval(this.updateTimer.bind(this), this.TimeGap);
    }
    pause() {
        running = false;
    }
    resume() {
        running = true;
    }
    stop() {
        running = false;
        clearInterval(this.timeinterval);
    }
}
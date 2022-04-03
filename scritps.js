const circleElement = document.querySelector('.circle');
const timeElement = document.querySelector('.time');
const timeModeElement = document.querySelector('.time-mode');
const turnElement = document.querySelector('.turn');
const controlButton = document.querySelector('.control-button');
const resetButton = document.querySelector('.reset-button');
const notificationSound = document.querySelector('#notification');

let isRunning,
    isBreakTime,
    workTime ,
    breakTime,
    longBreakTime,
    totalTurns,
    currentTurn,
    totalTime,
    timeRemaining,
    timer;
controlButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', reset);

function startValues(){
    isRunning = false;	
    isBreakTime = false;
    workTime = 25*60;
    breakTime = 5*60;
    longBreakTime = 15*60;
    totalTurns = 4;
    currentTurn = 1;
    totalTime = workTime;
    timeRemaining = totalTime;
    timer = null;

}
function toggleStartPause(){
    isRunning ? pause() : start();
}

 
function start(){
    isRunning = true;
    controlButton.innerText = 'Pause';
    timer = setInterval(updateTimer, 1000);
}
function pause(){
    isRunning = false;
    controlButton.innerText = 'Iniciar';
    clearInterval(timer);
}
function reset(){
    pause();
    startValues();
    drawTime();
    drawTurn();
}
function updateTimer(){
    if (timeRemaining > 0){
        timeRemaining--;        
    }else{
        finishTurn();
    }
    drawTime();
}

function finishTurn(){
    pause();
    notificationSound.play();
    nextTurn();
    drawTurn();
     }

function nextTurn(){
    isBreakTime = !isBreakTime;
    if(!isBreakTime){
        currentTurn++;
    }
    if(currentTurn<=totalTurns){
        if(isBreakTime){
            if(currentTurn < totalTime){
                totalTime = breakTime;
            }else{
                totalTime = longBreakTime;
            }
        }else{
            totalTime = workTime;
        }
        timeRemaining = totalTime;
    }else{
        reset();

    }

}


function drawTime(){
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    timeElement.innerText = `${minutes}:${seconds}`;
    setCirclePercent(timeRemaining / totalTime * 100);

}
function drawTurn(){
    let timeMode = 'Trabalho';
    if(isBreakTime){
        timeMode = currentTurn < totalTurns ? 'Intervalo' : 'Descanso longo';
     }
    timeModeElement.innerText = timeMode;
    turnElement.innerText = `${currentTurn} / ${totalTurns}`;
}

function setCirclePercent(percent){
    const circlePerimeter = 597;
    const dashOffest = (circlePerimeter * (percent / 100));
    circleElement.style.setProperty('--dashoffset', dashOffest);
}

reset();
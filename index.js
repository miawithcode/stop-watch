const timeDisplay = document.querySelector("#timeDisplay");

const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;

let paused = true;
let intervalId;

let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

startBtn.addEventListener("click", () => {
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 75);
    }
})

pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
})

resetBtn.addEventListener("click", () => {
    paused = true;
    startTime = 0;
    elapsedTime = 0;
    clearInterval(intervalId);
    hours = 0;
    minutes = 0;
    seconds = 0;
    miliseconds = 0;
    timeDisplay.textContent = "00:00:00:00";
})

function updateTime(){
    elapsedTime = Date.now() - startTime;

    miliseconds = Math.floor(elapsedTime % 60);
    seconds = Math.floor(elapsedTime / 1000 % 60);
    minutes = Math.floor(elapsedTime / 1000 / 60 % 60);
    hours = Math.floor(elapsedTime / 1000 / 60 / 60 % 60);

    miliseconds = formatTime(miliseconds);
    seconds = formatTime(seconds);
    minutes = formatTime(minutes);
    hours = formatTime(hours);

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;

    function formatTime(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}
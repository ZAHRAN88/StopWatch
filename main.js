let timer; // variable to hold setInterval function
let isRunning = false;
let startTime;
let lapTimes = [];
let lapCounter = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    } else {
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0); // adjust start time if there are lap times
        timer = setInterval(updateStopwatch, 10);
        isRunning = true;
    }
}

function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.stopwatch').textContent = formattedTime;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.querySelector('.stopwatch').textContent = '00:00:00';
    lapTimes = [];
    lapCounter = 1;
    document.querySelector('.lap-times').textContent = '';
}

function lap() {
    const elapsedTime = Date.now() - startTime;
    const lapTime = elapsedTime - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0); // calculate lap time
    lapTimes.push(lapTime);
    const formattedLapTime = formatTime(lapTime);
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCounter}: ${formattedLapTime}`;
    document.querySelector('.lap-times').appendChild(lapElement);
    lapCounter++;
}

function formatTime(ms) {
    const date = new Date(ms);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
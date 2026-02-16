// 1. Select the HTML elements for Stopwatch
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// 2. Initialize stopwatch variables
let startTime;
let elapsedTime = 0;
let timerInterval; // This variable holds the interval ID

// Function to format time for display (add leading zeros)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Function to display time
function updateDisplay() {
    const time = new Date(elapsedTime);
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();

    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = milliseconds.toString().padStart(3, '0');
}

// 3. Start button functionality
function startStopwatch() {
    // Clear any existing interval to prevent multiple timers running
    clearInterval(timerInterval);
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
}

// 4. Stop button functionality
function stopStopwatch() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// 5. Reset button functionality
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
}

// 6. Add event listeners to stopwatch buttons
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initial state for stopwatch: Stop and Reset buttons disabled
stopBtn.disabled = true;
resetBtn.disabled = true;

console.log("Stopwatch JS loaded!");

// --- Countdown Timer Logic ---

let countdownInterval;
let countdownTimeRemaining = 0; // in milliseconds

const countdownHoursDisplay = document.getElementById('countdownHours');
const countdownMinutesDisplay = document.getElementById('countdownMinutes');
const countdownSecondsDisplay = document.getElementById('countdownSeconds');

// FIX: Removed duplicated 'document ='
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const setTimeBtn = document.getElementById('setTimeBtn');

const countdownStartBtn = document.getElementById('countdownStartBtn');
const countdownPauseBtn = document.getElementById('countdownPauseBtn');
const countdownResetBtn = document.getElementById('countdownResetBtn');

// Function to format time for display
function formatCountdownTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        h: String(hours).padStart(2, '0'),
        m: String(minutes).padStart(2, '0'),
        s: String(seconds).padStart(2, '0')
    };
}

// Function to update the countdown display
function updateCountdownDisplay() {
    const { h, m, s } = formatCountdownTime(countdownTimeRemaining);
    countdownHoursDisplay.textContent = h;
    countdownMinutesDisplay.textContent = m;
    countdownSecondsDisplay.textContent = s;

    if (countdownTimeRemaining <= 0) {
        clearInterval(countdownInterval);
        countdownTimeRemaining = 0;
        // FIX: Removed the recursive call here to prevent infinite loop
        // updateCountdownDisplay(); // This line was causing the Max Call Stack error
        countdownStartBtn.disabled = false;
        countdownPauseBtn.disabled = true;
        countdownResetBtn.disabled = true;
        setTimeBtn.disabled = false; // Allow setting new time
        alert("Time's up!"); // Simple alert when time runs out
    }
}

// Set Time button event listener
setTimeBtn.addEventListener('click', () => {
    let h = parseInt(hoursInput.value) || 0;
    let m = parseInt(minutesInput.value) || 0;
    let s = parseInt(secondsInput.value) || 0;

    if (h < 0 || m < 0 || s < 0) {
        alert("Please enter positive time values.");
        return;
    }
    if (m > 59 || s > 59) {
        alert("Minutes and seconds must be 59 or less.");
        return;
    }

    countdownTimeRemaining = (h * 3600 + m * 60 + s) * 1000;
    updateCountdownDisplay();
    countdownStartBtn.disabled = false;
    countdownPauseBtn.disabled = true;
    countdownResetBtn.disabled = true;
    setTimeBtn.disabled = true; // Disable set time until reset or countdown ends
});

// Countdown Start button event listener
countdownStartBtn.addEventListener('click', () => {
    if (countdownTimeRemaining === 0) {
        alert("Please set a time before starting the countdown!");
        return;
    }
    // Clear any existing interval to prevent multiple timers running
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        countdownTimeRemaining -= 1000; // Decrease by 1 second
        updateCountdownDisplay();
    }, 1000); // Update every second

    countdownStartBtn.disabled = true;
    countdownPauseBtn.disabled = false;
    countdownResetBtn.disabled = false;
    setTimeBtn.disabled = true; // Keep set time disabled
});

// Countdown Pause button event listener
countdownPauseBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownStartBtn.disabled = false;
    countdownPauseBtn.disabled = true;
    countdownResetBtn.disabled = false;
    setTimeBtn.disabled = true; // Keep set time disabled
});

// Countdown Reset button event listener
countdownResetBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownTimeRemaining = 0;
    updateCountdownDisplay();
    countdownStartBtn.disabled = false;
    countdownPauseBtn.disabled = true;
    countdownResetBtn.disabled = true;
    setTimeBtn.disabled = false; // Allow setting new time
});

// Initialize countdown display and disable pause/reset on load
window.addEventListener('load', () => {
    updateCountdownDisplay();
    countdownStartBtn.disabled = true; // Disabled until time is set
    countdownPauseBtn.disabled = true;
    countdownResetBtn.disabled = true;
    setTimeBtn.disabled = false;
});

console.log("Countdown Timer JS loaded!");

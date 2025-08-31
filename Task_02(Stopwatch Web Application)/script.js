// DOM element references
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

// Timer state variables
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
let pausedTime = 0;

// --- Event Listeners ---
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

// --- Core Functions ---

/**
 * Starts or pauses the stopwatch based on its current state.
 */
function startPauseTimer() {
    if (!running) {
        // --- Start the timer ---
        startTime = new Date().getTime() - pausedTime; // Adjust start time if resuming from pause
        tInterval = setInterval(updateTime, 1); // Update every millisecond for accuracy
        running = true;
        
        // Update button states and styles
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.remove('bg-cyan-500', 'hover:bg-cyan-600');
        startPauseButton.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
        resetButton.disabled = false;
        lapButton.disabled = false;
    } else {
        // --- Pause the timer ---
        clearInterval(tInterval);
        pausedTime = new Date().getTime() - startTime; // Store the elapsed time
        running = false;

        // Update button states and styles
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
        startPauseButton.classList.add('bg-cyan-500', 'hover:bg-cyan-600');
    }
}

/**
 * Resets the stopwatch to its initial state.
 */
function resetTimer() {
    clearInterval(tInterval);
    running = false;
    pausedTime = 0;
    lapCounter = 0;
    
    // Reset display
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '000';
    
    // Reset buttons
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
    startPauseButton.classList.add('bg-cyan-500', 'hover:bg-cyan-600');
    resetButton.disabled = true;
    lapButton.disabled = true;

    // Clear laps
    lapsList.innerHTML = '';
}

/**
 * Records the current time as a lap and displays it.
 */
function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(difference);
        
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-800 p-2 rounded-md text-lg';
        li.innerHTML = `
            <span class="text-gray-400">Lap ${lapCounter}</span>
            <span class="font-mono">${lapTime}</span>
        `;
        lapsList.prepend(li); // Add new lap to the top of the list
    }
}

/**
 * Updates the timer display every interval.
 */
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const { hours, minutes, seconds, milliseconds } = getTimeComponents(difference);
    
    // Update the DOM with formatted time
    hoursElement.textContent = pad(hours);
    minutesElement.textContent = pad(minutes);
    secondsElement.textContent = pad(seconds);
    millisecondsElement.textContent = pad(milliseconds, 3);
}

// --- Helper Functions ---

/**
 * Calculates hours, minutes, seconds, and milliseconds from a total time difference.
 * @param {number} timeDifference - The elapsed time in milliseconds.
 * @returns {object} An object containing the time components.
 */
function getTimeComponents(timeDifference) {
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((timeDifference % 1000));
    return { hours, minutes, seconds, milliseconds };
}

/**
 * Formats a time difference into a HH:MM:SS.MS string.
 * @param {number} timeDifference - The elapsed time in milliseconds.
 * @returns {string} The formatted time string.
 */
function formatTime(timeDifference) {
    const { hours, minutes, seconds, milliseconds } = getTimeComponents(timeDifference);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

/**
 * Pads a number with a leading zero if it's less than 10 (or to a specified length).
 * @param {number} num - The number to pad.
 * @param {number} [size=2] - The desired length of the string.
 * @returns {string} The padded number as a string.
 */
function pad(num, size = 2) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

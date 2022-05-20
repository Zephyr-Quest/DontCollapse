const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

// Chrono
const delay = 1000;
let chronoMinutes = 12;
let chronoSeconds = 0;
let stopChrono = true;

/**
 * decrement chrono
 */
function descendLeChronoMonAmi() {
    if(stopChrono)return
    // decrement seconds
    chronoSeconds--;

    // decrement minutes
    if (chronoSeconds < 0) {
        chronoSeconds = 59;
        chronoMinutes--;
    }

    // Display the chrono
    updateChronoHUD();

    // Continue
    if (!stopChrono) setTimeout(descendLeChronoMonAmi, delay);
}

/**
 * Start the chrono from the given timestamp
 * @param {Number} minutes The timestamp minutes
 * @param {Number} seconds The timestamp seconds
 */
function startChronoFrom(minutes, seconds) {
    if (typeof minutes !== 'number' || minutes < 0 || minutes > 59)
        return;
    if (typeof seconds !== 'number' || seconds < 0 || seconds > 59)
        return;

    // Set the chrono
    chronoMinutes = minutes;
    chronoSeconds = seconds;

    // Display the chrono
    updateChronoHUD();

    if (stopChrono) {
        // Start the chrono
        stopChrono = false;
        descendLeChronoMonAmi();
    }
}

function updateChronoHUD() {
    minutesSpan.innerText = chronoMinutes < 10 ? "0" + chronoMinutes : chronoMinutes;
    secondsSpan.innerText = chronoSeconds < 10 ? "0" + chronoSeconds : chronoSeconds;
}

/**
 * Stop the chrono
 */
function stopChronoo() {
    stopChrono = true;
}

/**
 * Restart the chrono
 */
function startChrono() {
    stopChrono = false;

    // Display the chrono
    updateChronoHUD();

    // Start the chrono
    descendLeChronoMonAmi();
}

function getChronoStatus() {
    return !stopChrono
}

function getChronoValue() {
    return [chronoMinutes, chronoSeconds]
}

function getChronoMinutes() {
    return chronoMinutes
}

function getChronoSeconds() {
    return chronoSeconds
}

export default {
    descendLeChronoMonAmi,
    startChronoFrom,
    updateChronoHUD,
    stopChronoo,
    startChrono,

    getChronoStatus,
    getChronoValue,
    getChronoMinutes,
    getChronoSeconds
}
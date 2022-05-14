const delay = 1000;

module.exports = class Chrono {
    constructor(monthCallback, endGameCallBack) {
        this.minutes = 10;
        this.seconds = 0;
        this.stopChrono = false;

        this.monthCallback = monthCallback;
        this.endGameCallBack = endGameCallBack;
    }
    
    /**
     * Increment the chrono each second
     */
    incrementChrono() {
        // Increment minutes
        if (this.seconds <= 0) {
            this.seconds = 60;
            this.minutes--;
        }
        
        // Increment seconds
        this.seconds--;
        
        if (this.seconds === 0)
            this.monthCallback();
        
        if (this.minutes === 9 && this.seconds === 55){
            this.stopChrono = true;
            this.endGameCallBack();
        }
        
            // Continue
        if (!this.stopChrono) setTimeout(() => this.incrementChrono(), delay);
        else console.log("stop chrono");
    }

    /**
     * Get elapased seconds since the start of the chrono
     * @returns All elapsed seconds
     */
    getTimeSeconds() {
        let seconds = Number(this.seconds);
        let minutes = Number(this.minutes);

        while (minutes > 0) {
            seconds += 60;
            minutes--;
        }

        return seconds;
    }

    /**
     * Get elapased time since the start of the chrono
     * @returns All elapsed time
     */
     getTime() {
        return {min: this.minutes, sec: this.seconds};
    }
}
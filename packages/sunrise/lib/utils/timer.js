class TimeFormatter {
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    getWeekday(date) {
        const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return week[date.getDay()];
    }
    formatTime(date) {
        const hour = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const sec = String(date.getSeconds()).padStart(2, '0');
        return `${hour}:${min}:${sec}`;
    }
}
export class TimeUpdater {
    #timer;
    #formatter;
    constructor() {
        this.#timer = new Timer();
        this.#formatter = new TimeFormatter();
    }
    #updateDateTime(callback) {
        const date = new Date();
        const formattedDate = this.#formatter.formatDate(date);
        const today = this.#formatter.getWeekday(date);
        const nowTime = this.#formatter.formatTime(date);
        callback({ formattedDate, today, nowTime });
    }
    startUpdate(callback) {
        this.#updateDateTime(callback);
        this.#timer.start(() => this.#updateDateTime(callback), 1000);
    }
    stopUpdate() {
        this.#timer.stop();
    }
}
class Timer {
    intervalId = null;
    start(callback, interval) {
        this.intervalId = setInterval(callback, interval);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
export const timeUpdater = new TimeUpdater();

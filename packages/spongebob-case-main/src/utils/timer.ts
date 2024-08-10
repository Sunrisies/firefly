/**
 * TimeFormatter 类用于将 Date 对象格式化为特定的字符串。
 *
 * @class TimeFormatter
 */
class TimeFormatter {
  /**
   * 将 Date 对象格式化为 YYYY-MM-DD 格式的日期字符串。
   *
   * @param {Date} date - 要格式化的日期对象
   * @returns {string} - 格式化后的日期字符串
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * 获取星期几的字符串表示（如 "星期一"）。
   *
   * @param {Date} date - 要获取星期几的日期对象
   * @returns {string} - 星期几的字符串表示
   */
  getWeekday(date: Date): string {
    const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return week[date.getDay()];
  }

  /**
   * 将 Date 对象格式化为 HH:mm:ss 格式的时间字符串。
   *
   * @param {Date} date - 要格式化的日期对象
   * @returns {string} - 格式化后的时间字符串
   */
  formatTime(date: Date): string {
    const hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${hour}:${min}:${sec}`;
  }
}
type TimeUpdaterType = {
  startUpdate: () => void;
  stopUpdate: () => void;
};
export type upTimeType = {
  formattedDate: string;
  today: string;
  nowTime: string;
};
/**
 * TimeUpdater 类用于获取和格式化当前时间。
 *
 * @class TimeUpdater
 */
export class TimeUpdater {
  #timer: Timer; // 假设 Timer 类已定义
  #formatter: TimeFormatter; // 假设 TimeFormatter 类已定义

  /**
   * 创建一个新的 TimeUpdater 实例。
   *
   * @constructor
   */
  constructor() {
    this.#timer = new Timer();
    this.#formatter = new TimeFormatter();
  }

  /**
   * 更新日期和时间，并输出到控制台。
   *
   * @param callback - 回调函数，接收一个包含formattedDate, today, nowTime的对象
   * @returns {void} 无返回值，通过回调函数传递数据
   * @private
   */
  #updateDateTime(callback: (result: upTimeType) => void): void {
    const date = new Date();
    const formattedDate = this.#formatter.formatDate(date);
    const today = this.#formatter.getWeekday(date);
    const nowTime = this.#formatter.formatTime(date);
    callback({ formattedDate, today, nowTime });
  }

  /**
   * 开始定期更新时间。
   *
   * @param callback - 回调函数，接收一个包含formattedDate, today, nowTime的对象
   * @public
   */
  public startUpdate(callback: (result: upTimeType) => void): void {
    this.#updateDateTime(callback);
    this.#timer.start(() => this.#updateDateTime(callback), 1000);
  }

  /**
   * 停止定期更新时间。
   *
   * @public
   */
  public stopUpdate(): void {
    this.#timer.stop();
  }
}

/**
 * Timer 类用于定时触发某个回调。
 *
 * @class Timer
 */
class Timer {
  private intervalId: number | null = null;

  /**
   * 开始定时触发回调。
   *
   * @param {Function} callback - 要定时触发的回调
   * @param {number} interval - 定时间隔（毫秒）
   */
  start(callback: () => void, interval: number): void {
    this.intervalId = setInterval(callback, interval);
  }

  /**
   * 停止定时触发回调。
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
export const timeUpdater = new TimeUpdater();

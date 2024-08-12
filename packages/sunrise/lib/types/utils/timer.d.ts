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
export declare class TimeUpdater {
    #private;
    /**
     * 创建一个新的 TimeUpdater 实例。
     *
     * @constructor
     */
    constructor();
    /**
     * 开始定期更新时间。
     *
     * @param callback - 回调函数，接收一个包含formattedDate, today, nowTime的对象
     * @public
     */
    startUpdate(callback: (result: upTimeType) => void): void;
    /**
     * 停止定期更新时间。
     *
     * @public
     */
    stopUpdate(): void;
}
export declare const timeUpdater: TimeUpdater;

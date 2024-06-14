export type upTimeType = {
    formattedDate: string;
    today: string;
    nowTime: string;
};
export declare class TimeUpdater {
    #private;
    constructor();
    startUpdate(callback: (result: upTimeType) => void): void;
    stopUpdate(): void;
}
export declare const timeUpdater: TimeUpdater;

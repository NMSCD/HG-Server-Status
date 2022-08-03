export interface MonitorRecordViewModel {
    monitorId: number;
    name: string;
    url: string;
    ticks: Array<MonitorRecordTickViewModel>;
    minMinutesSinceEpochInterval: number;
    maxMinutesSinceEpochInterval: number;
}

export interface MonitorRecordTickViewModel {
    maxStatus: number;
    minutesSinceEpochInterval: number;
    dateRecorded: string;
}

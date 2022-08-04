export interface MonitorStatusViewModel {
    monitorId: number;
    name: string;
    status: number;
    hours: Array<MonitorStatusHourViewModel>;
    minHoursSinceEpochInterval: number;
    maxHoursSinceEpochInterval: number;
}

export interface MonitorStatusHourViewModel {
    maxStatus: number;
    hourSinceEpochInterval: number;
    dateRecorded: Date;
    ticks: Array<MonitorStatusTickViewModel>;
}

export interface MonitorStatusTickViewModel {
    status: number;
    minutesSinceEpochInterval: number;
    dateRecorded: string;
}

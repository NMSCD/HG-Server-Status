import { MonitorRecordTickViewModel } from "../MonitorRecordViewModel";

export interface MonitorRecordPerHour {
    maxStatus: number;
    hoursSinceEpochInterval: number;
    records: Array<MonitorRecordTickViewModel>;
}
export interface MonitorStatusViewModel {
  monitorId: number;
  name: string;
  url: string;
  status: number;
  hours: Array<MonitorStatusHourViewModel>;
  minHoursSinceEpochInterval: number;
  maxHoursSinceEpochInterval: number;
}

export interface MonitorStatusHourViewModel {
  numStatuses: number;
  numSuccessStatuses: number;
  hourSinceEpochInterval: number;
}

export interface MonitorStatusTickViewModel {
  numStatuses: number;
  numSuccessStatuses: number;
  minutesSinceEpochInterval: number;
}

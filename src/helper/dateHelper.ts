import dayjs from "dayjs";

export const formatDate = (
  date: Date,
  format: string = "YYYY-MM-DD hh:mm"
): string => {
  try {
    return dayjs(date).format(format);
  } catch {
    return "";
  }
};

export const monitorHourFormat = (date: Date): string =>
  formatDate(date, "YYYY-MM-DD hhA (Z)");
export const monitorTickFormat = (date: Date): string =>
  formatDate(date, "YYYY-MM-DD hh:mm (Z)");

export const hoursToEpoch = (hours: number): Date => {
  const d = new Date(0);
  d.setUTCHours(hours);
  return d;
};

export const minutesToEpoch = (minutes: number): Date => {
  const d = new Date(0);
  d.setUTCMinutes(minutes);
  return d;
};

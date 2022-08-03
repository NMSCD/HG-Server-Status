export const hoursToEpoch = (hours: number): Date => {
    const d = new Date(0);
    d.setUTCHours(hours);
    return d;
}

export const minutesToEpoch = (minutes: number): Date => {
    const d = new Date(0);
    d.setUTCMinutes(minutes);
    return d;
}
export const startOfDay = (date: Date): Date => {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);
    return start;
}

export const endOfDay = (date: Date): Date => {
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);
    return end;
}

export const isBefore = (date1: Date, date2: Date): boolean => {
    return date1.getTime() < date2.getTime();
}
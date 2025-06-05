import { prisma } from "../lib/prisma";
import { startOfDay, endOfDay, isBefore } from "../utils/dateUtils";

export const createDentist = async (data: {
    fullName: string;
    email: string;
    specialty?: string;
    phone?: string;
}) => {
    return await prisma.dentist.create({ data });
};

export const getAllDentists = async () => {
    return await prisma.dentist.findMany({ orderBy: { fullName: 'asc' } });
};

export const getDentistById = async (id: number) => {
    return await prisma.dentist.findUnique({
        where: { id },
    });
};

export const updateDentistProfile = async (id: number, data: Partial<{
    fullName: string;
    email: string;
    specialty?: string;
    phone: string;
}>) => {
    return await prisma.dentist.update({
        where: { id },
        data,
    });
};

export const getAvailableSlot = async (dentistId: number, date: Date) => {
    const startHour = 1; // 1 AM UTC = 9 AM PHT
    const endHour = 9;   // 9 AM UTC = 5 PM PHT
    const interval = 30; // in minutes

    // Create a new date at UTC midnight for the selected day
    const selectedDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    const now = new Date();
    const slots: Date[] = [];

    // Generate time slots for the selected date
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            const slotTime = new Date(selectedDateUTC);
            slotTime.setUTCHours(hour, minute, 0, 0);
            if (isBefore(now, slotTime)) slots.push(slotTime);
        }
    }

    // Fetch booked appointments for the dentist on the selected date
    const bookApointments = await prisma.appointment.findMany({
        where: {
            dentistId: dentistId,
            scheduledAt: {
                gte: startOfDay(selectedDateUTC),
                lte: endOfDay(selectedDateUTC),
            },
        },
        select: {
            scheduledAt: true,
        },
    });

    const bookTimes = bookApointments.map(appointment => new Date(appointment.scheduledAt).toISOString());

    const slotsWithavailability = slots.map(slot => ({
        datetime: slot.toISOString(),
        available: !bookTimes.includes(slot.toISOString()),
    }));

    return slotsWithavailability
}



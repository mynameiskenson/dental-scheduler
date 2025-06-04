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
    const startHour = 9;
    const endHour = 17;
    const interval = 30; // in minutes

    const selectedDate = new Date(date);
    const now = new Date();
    const slots: Date[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            const slotTime = new Date(selectedDate);
            slotTime.setHours(hour, minute, 0, 0);
            if (isBefore(now, slotTime)) slots.push(slotTime);
        }
    }

    const bookApointments = await prisma.appointment.findMany({
        where: {
            dentistId: dentistId,
            scheduledAt: {
                gte: startOfDay(selectedDate),
                lte: endOfDay(selectedDate),
            },
        },
        select: {
            scheduledAt: true,
        },
    });

    const bookTimes = bookApointments.map(appointment => new Date(appointment.scheduledAt).toISOString());
    const availableSlots = slots.filter(slot => {
        const slotTime = slot.toISOString();
        !bookTimes.includes(slotTime);
    });

    return availableSlots
}



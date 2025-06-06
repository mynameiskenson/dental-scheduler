import { prisma } from "../lib/prisma";

export const createAppointment = async (data: {
    userId: number;
    dentistId: number;
    scheduledAt: Date;
    reason?: string;
}) => {
    return await prisma.appointment.create({ data });
};

export const getAllAppointments = async () => {
    return await prisma.appointment.findMany({
        orderBy: { scheduledAt: 'asc' },
        include: {
            user: true,
            dentist: true,
        },
    });
};

export const getAppointmentForUser = async (userId: number) => {
    return await prisma.appointment.findMany({
        where: { userId },
        orderBy: { scheduledAt: 'asc' },
        include: {
            dentist: true,
        },
    });
};

export const getAppointmentForDentist = async (dentistId: number) => {
    return await prisma.appointment.findMany({
        where: { dentistId },
        orderBy: { scheduledAt: 'asc' },
        include: {
            user: true,
        },
    });
}

export const cancelAppointment = async (appointmentId: number) => {
    return await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'cancelled' }
    });
}

export const rescheduleAppointment = async ({
    userId,
    dentistId,
    scheduledAt,
    reason,
}: {
    userId: number;
    dentistId: number;
    scheduledAt: string; // ISO 8601 format
    reason?: string;
}, appointmentId: number
) => {
    return await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
            userId,
            dentistId,
            scheduledAt,
            reason,
        }
    });
}


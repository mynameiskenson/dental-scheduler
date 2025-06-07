import { prisma } from "../lib/prisma";
import { notify } from "../lib/notify";

export const createAppointment = async (data: {
    userId: number;
    dentistId: number;
    scheduledAt: Date;
    reason?: string;
}) => {
    const appointment = await prisma.appointment.create({ data });

    const [user, dentist] = await Promise.all([
        prisma.user.findUnique({ where: { id: data.userId } }),
        prisma.dentist.findUnique({ where: { id: data.dentistId } }),
    ]);

    const datetime = new Date(data.scheduledAt).toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
    });

    const message = `Appointment Confirmed\nDate & Time: ${datetime}\nReason: ${data.reason ?? 'General Checkup'}`;

    await notify(user, dentist, message, 'Your Appointment is Confirmed', 'New Appointment Scheduled');

    return appointment;
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
    const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'cancelled' },
    });

    // Fetch user and dentist for notification
    const [user, dentist] = await Promise.all([
        prisma.user.findUnique({ where: { id: appointment.userId } }),
        prisma.dentist.findUnique({ where: { id: appointment.dentistId } }),
    ]);

    const datetime = new Date(appointment.scheduledAt).toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
    });

    const message = `Your appointment scheduled for ${datetime} has been cancelled.`;

    await notify(user, dentist, message, 'Appointment Cancelled', 'Appointment Cancelled');

    return appointment;
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
    const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
            userId,
            dentistId,
            scheduledAt,
            reason,
            status: 'scheduled',
        },
    });

    // Fetch user and dentist for notification
    const [user, dentist] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId } }),
        prisma.dentist.findUnique({ where: { id: dentistId } }),
    ]);

    const datetime = new Date(scheduledAt).toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
    });

    const message = `Your appointment has been rescheduled to ${datetime}.\nReason: ${reason ?? 'General Checkup'}`;

    await notify(user, dentist, message, 'Appointment Rescheduled', 'Appointment Rescheduled');

    return appointment;
}


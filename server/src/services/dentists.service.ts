import { prisma } from "../lib/prisma";

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
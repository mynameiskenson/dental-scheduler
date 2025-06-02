import { prisma } from "../lib/prisma";

export const createUser = async (data: {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
}) => {
    return await prisma.user.create({ data });
};

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const updateUserProfile = async (id: number, data: Partial<{
    fullName: string;
    email: string;
    phone: string;
}>) => {
    return await prisma.user.update({
        where: { id },
        data,
    });
};
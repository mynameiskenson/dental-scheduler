import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../lib/auth";

export const createUser = async (data: {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
}) => {
    const hashedPassword = await hashPassword(data.passwordHash);
    return await prisma.user.create({
        data: {
            fullName: data.fullName,
            email: data.email,
            passwordHash: hashedPassword,
            phone: data.phone,
        }
    });
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

export const authenticateUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    return isPasswordValid ? user : null;
}
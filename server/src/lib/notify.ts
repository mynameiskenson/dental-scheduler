import { sendWhatsApp, sendEmail } from './notifications';

export const notify = async (
    user: any,
    dentist: any,
    message: string,
    userEmailSubject: string,
    dentistEmailSubject: string
) => {
    if (user?.phone) {
        console.log(`Sending WhatsApp to user: ${user.phone}`);
        await sendWhatsApp(user.phone, `Hello ${user.fullName},\n${message}`);
    }
    if (dentist?.phone) {
        console.log(`Sending WhatsApp to dentist: ${dentist.phone}`);
        await sendWhatsApp(dentist.phone, `Hello ${dentist.fullName},\n${message}`);
    }
    if (user?.email) {
        console.log(`Sending Email to user: ${user.email}`);
        await sendEmail(user.email, userEmailSubject, `<p>${message}</p>`);
    }
    if (dentist?.email) {
        console.log(`Sending Email to dentist: ${dentist.email}`);
        await sendEmail(dentist.email, dentistEmailSubject, `<p>${message}</p>`);
    }
};
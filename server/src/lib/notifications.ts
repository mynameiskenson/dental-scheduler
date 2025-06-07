import twilio from "twilio"
import nodemailer from "nodemailer"

// Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM!;

const client = twilio(accountSid, authToken);

export async function sendWhatsApp(to: string, message: string) {
    await client.messages.create({
        from: `whatsapp:${whatsappFrom}`,
        to: `whatsapp:${to}`,
        body: message
    });
}


// Nodemailer
const adminEmail = process.env.SMTP_USER!;
const adminPassword = process.env.SMTP_PASS!;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
});

export async function sendEmail(to: string, subject: string, html: string) {
    await transporter.sendMail({
        from: adminEmail,
        to,
        subject,
        html,
    });
}

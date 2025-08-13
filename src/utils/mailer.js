import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('Error connecting to SMTP server:', error);
    } else {
        console.log('SMTP Server ready to send emails');
    }
});

export const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: `"Enzo Project Backend II" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (to, verifyLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `SmartHub <${process.env.EMAIL_USER}>`,
    to,
    subject: "Xác thực Email",
    html: `<p>Nhấn vào link dưới đây để xác thực email:</p>
           <a href="${verifyLink}">${verifyLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

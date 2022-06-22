"use strict";
import nodemailer from "nodemailer";

export async function sendEmail(email,subject,text,html) {

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PaSSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"SHOP" <'+process.env.EMAIL+'>', 
    to: email, 
    subject: subject, 
    text: text,
    html: html,
  });
}
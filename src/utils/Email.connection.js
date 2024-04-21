import nodemailer from "nodemailer";
import 'dotenv/config.js'


export const transporter = nodemailer.createTransport({
    host: process.env.EMAHOST,
    port: process.env.EMAPORT,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAUSER,
      pass: process.env.EMAPASS,
    },
  });

 

  
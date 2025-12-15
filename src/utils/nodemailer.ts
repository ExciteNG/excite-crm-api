import nodemailer from 'nodemailer';

export const createTransport = (auth: { user: string; pass: string }) => {
  const transporter = nodemailer.createTransport({
    // service: 'Outlook365',
    pool: true,
    maxConnections: 3,
    host: 'smtp-mail.outlook.com',
    port: 587,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    auth: {
      user: auth.user,
      pass: auth.pass,
    },
  });

  return transporter;
};

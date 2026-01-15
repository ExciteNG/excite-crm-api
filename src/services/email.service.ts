// import nodemailer, { Transporter } from 'nodemailer';

// import { HttpException } from '@/exceptions/HttpException';
// import { NODEMAILER_EMAIL, NODEMAILER_PASS } from '@config';

// class EmailService {
//   private user = NODEMAILER_EMAIL;
//   private pass = NODEMAILER_PASS;

//   private transport: Transporter = nodemailer.createTransport({
//     host: 'smtp-mail.outlook.com',
//     port: 587,
//     tls: {
//       ciphers: 'SSLv3',
//     },
//     auth: {
//       user: this.user,
//       pass: this.pass,
//     },
//   });

//   public async sendEmail({
//     to,
//     subject,
//     body,
//   }: {
//     to: string;
//     subject: string;
//     body: string;
//   }) {
//     try {
//       await this.transport.verify();
//       this.transport.sendMail({
//         to,
//         subject,
//         html: body,
//         from: `Excite CRM <${this.user}>`,
//       });
//     } catch (err) {
//       throw new HttpException(400, 'Error sending mail');
//     }
//   }
// }

// export default EmailService;

import nodemailer, { Transporter } from 'nodemailer';

import { HttpException } from '@/exceptions/HttpException';
import { NODEMAILER_EMAIL, NODEMAILER_PASS } from '@config';
import { SendBulkEmail, SendEmail } from '@/interfaces/type';
import Email from '@/models/email.model';
// import agenda from '@/config/agenda';

class EmailService {
  private user = NODEMAILER_EMAIL;
  private pass = NODEMAILER_PASS;
  private email = Email;

  private transport: Transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: this.user,
      pass: this.pass,
    },
  });

  public async sendUserEmail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }) {
    try {
      await this.transport.verify();
      this.transport.sendMail({
        to,
        subject,
        html: body,
        from: `Teon Suites <${this.user}>`,
      });
    } catch (err) {
      throw new HttpException(400, 'Error sending mail');
    }
  }

  public async sendEmail(opts: SendEmail) {
    const cc = typeof opts.cc === 'string' ? opts.cc : opts.cc.join(',');
    const bcc = typeof opts.bcc === 'string' ? opts.bcc : opts.bcc.join(',');

    const emailDoc = await this.email.create({
      cc,
      bcc,
      to: opts.to,
      body: opts.body,
      subject: opts.subject,
      from: opts.from.user,
      status: 'pending',
    });

    await this.transport.verify();
    try {
      const info = await this.transport.sendMail({
        to: opts.to,
        cc: opts.cc,
        bcc: opts.bcc,
        subject: opts.subject,
        html: opts.body,
        from: opts.from.user,
      });

      emailDoc.status = 'sent';
      await emailDoc.save();

      // opts.socketId &&
      //   io.to(opts.socketId).emit('email-status', {
      //     email: opts.to,
      //     status: 'sent',
      //     info,
      //   });

      return { email: opts.to, status: 'sent', info };
    } catch (err) {
      console.log(err);
      emailDoc.status = 'failed';
      await emailDoc.save();

      // opts.socketId &&
      //   io.to(opts.socketId).emit('email-status', {
      //     email: opts.to,
      //     status: 'failed',
      //     error,
      //   });

      return { email: opts.to, status: 'failed', error: err };
      // throw new HttpException(400, 'Error sending mail');
    }
  }

  // public async SendBulkEmailAgenda(opts: SendBulkEmail) {
  //   const batchSize = 50;
  //   const mailId = (Math.random() + 1).toString(36).substring(2);
  //   for (let i = 0; i < opts.emails.length; i += batchSize) {
  //     const batch = opts.emails.slice(i, i + batchSize);

  //     await agenda.schedule(new Date(), 'send-bulk-email', {
  //       ...opts,
  //       batch,
  //       mailId,
  //       total: opts.emails.length,
  //     });
  //   }
  // }
}

export default EmailService;

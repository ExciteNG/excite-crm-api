import Agenda, { Job } from 'agenda';
import { createTransport } from './nodemailer';
import { io } from '..';
import Email from '@/models/email.model';

type SendBulkEmail = {
  mailId: string;
  total: number;
  batch: string[];
  cc?: string | string[];
  bcc?: string | string[];
  body: string;
  subject: string;
  socketId?: string;
  from: {
    user: string;
    pass: string;
    username: string;
  };
};

const agenda = new Agenda({
  db: {
    // address: 'mongodb://localhost:27017/email-service',
    address:
      'mongodb+srv://excitedb:FHa3W0gyWX0LXYuY@cluster0.kb2rj.mongodb.net/excite-crm-dev?retryWrites=true&w=majority',
  },
});

agenda.define<SendBulkEmail>(
  'send-bulk-email',
  async (job: Job<SendBulkEmail>) => {
    const { batch, mailId, total, subject, cc, bcc, body, from, socketId } =
      job.attrs.data;
    const transporter = createTransport(from);
    // console.log('I GOT HERE FIRST IN AGENDA');
    for (const to of batch) {
      const emailDoc = await Email.create({
        to,
        cc,
        bcc,
        body,
        emailId: mailId,
        subject,
        from: from.username ? `${from.username} <${from.user}>` : from.user,
        status: 'pending',
      });
      // console.log(emailDoc);

      try {
        const info = await transporter.sendMail({
          to,
          cc,
          bcc,
          subject,
          html: body,
          from: from.username ? `${from.username} <${from.user}>` : from.user,
        });
        emailDoc.status = 'sent';
        const updatedDoc = await emailDoc.save();
        console.log('Updfta: ', updatedDoc);

        socketId &&
          io
            .to(socketId)
            .emit('email-status', { email: to, status: 'sent', info });
      } catch (error) {
        console.log('Error doc: ', error);
        emailDoc.status = 'failed';
        await emailDoc.save();

        // Emit failure event
        socketId &&
          io.to(socketId).emit('email-status', {
            email: to,
            status: 'failed',
            error,
          });
      }
    }

    const remainingEmails = await Email.countDocuments({
      mailId,
      status: 'pending',
    });
    if (remainingEmails === 0 && socketId) {
      const sent = await Email.countDocuments({ mailId, status: 'sent' });
      const failed = await Email.countDocuments({ mailId, status: 'failed' });
      io.to(socketId).emit('email-completed', { total, sent, failed });
    }
  }
);

export default agenda;

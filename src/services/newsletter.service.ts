import { NODEMAILER_EMAIL, NODEMAILER_PASS } from '@/config';
import agenda from '@/utils/agenda';
import { newsletterValidationDto } from '@/validator/newsletter.validator';

class NewsletterService {
  public async sendNewsletter(authUser, formData: FormData, files: any[]) {
    const data = formData;

    console.log(
      'Raw Data: ',
      data['to'],
      JSON.parse(data['to']),
      typeof data['to'],
      data['to'].length
    );

    // data['to'] = JSON.parse(data['to'] as unknown as string);
    // if (typeof data['to'] === 'string') {
    //   console.log('Data to is string, parsing to array');
    //   data['to'] = data['to'].split(',').map((email: string) => email.trim());
    // }

    // console.log('Parsed Data: ', data);

    // const batchSize = 50;
    // const mailId = (Math.random() + 1).toString(36).substring(2);

    // for (let i = 0; i < data.to.length; i += batchSize) {
    //   const batch = data.to.slice(i, i + batchSize);

    //   await agenda.schedule(new Date(), 'send-bulk-email', {
    //     from: {
    //       user: NODEMAILER_EMAIL,
    //       pass: NODEMAILER_PASS,
    //       username: 'Excite CRM',
    //     },
    //     body: data.message,
    //     emails: data.to,
    //     subject: data.subject,
    //     socketId: data.socketId,
    //     cc: data.cc ? data.cc.join(',') : undefined,
    //     bcc: data.bcc ? data.bcc.join(',') : undefined,
    //     mailId,
    //     batch,
    //     total: data.to.length,
    //   });
    // }
  }
}

export default NewsletterService;

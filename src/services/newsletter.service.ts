import { BUCKET_NAME, NODEMAILER_EMAIL, NODEMAILER_PASS } from '@/config';
import agenda from '@/config/agenda';
import { HttpException } from '@/exceptions/HttpException';
import { IManager } from '@/models/manager.model';
// import Report from '@/models/reports.model';
import { IUser } from '@/models/users.model';
import { fromUserPass } from '@/utils/constants';
import uploadImage from '@/utils/image';
import { renderTemplate } from '@/utils/template.utils';
// import customErrorMap from '@/validator/customErrorMap';
import {
  newsLetterValidationDto,
  newsLetterValidationSchema,
} from '@/validator/newsletter.validator';

class NewsletterService {
  // public report = Report;

  public previewNewsletter = async (
    formData: FormData,
    userData: IManager,
    files: any
  ) => {
    const file = files.file && (files.file as Blob);
    const banner = files.banner && (files.banner as Blob);

    const data = formData;

    // console.log(data["to"]);
    data['to'] = JSON.parse(data['to'] as unknown as string);
    data['hotPicks'] = JSON.parse(data['hotPicks'] as unknown as string);
    data['economicReport'] = JSON.parse(
      data['economicReport'] as unknown as string
    );
    data['podcastVlogs'] = JSON.parse(
      data['podcastVlogs'] as unknown as string
    );

    const body = data as unknown as newsLetterValidationDto;

    // let validationResult = newsLetterValidationSchema.safeParse(body, {
    //   errorMap: customErrorMap,
    // });

    // if (validationResult.success) {
    //* use nodemailer here to create the mail
    //* possibly loop through the emails we are sending to, to add the unsubscribe button
    let imageUrl!: string;
    let bannerUrl!: string;

    if (file) {
      const fileToUpload = file[0] as any;

      const fileBuffer = file[0].buffer;

      const uploadResult = await uploadImage(
        fileBuffer,
        fileToUpload.name,
        body.subject
      );

      if (uploadResult.httpStatusCode !== 200)
        throw new HttpException(
          uploadResult.httpStatusCode || 500,
          'Something went wrong uploading image!'
        );

      //* upload successful we wish to send to email
      imageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${body.subject}/${fileToUpload.name}`;
    }

    if (banner) {
      const fileToUpload = banner[0] as any;

      const fileBuffer = banner[0].buffer;

      const subject = body.subject;

      const uploadResult = await uploadImage(
        fileBuffer,
        fileToUpload.originalname,
        subject
      );

      if (uploadResult.httpStatusCode !== 200)
        throw new HttpException(
          uploadResult.httpStatusCode || 500,
          'Something went wrong uploading image!'
        );

      //* upload successful we wish to send to email
      bannerUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${subject}/${fileToUpload.originalname}`;
      // console.log(bannerUrl);
    }

    // let provider: 'precise' | 'teonengine';
    // if (userData.email === TEONENGINE_ADMIN_EMAIL) {
    //   provider = 'teonengine';
    // } else if (
    //   userData.email === PRECISE_POINT_ADMIN_EMAIL
    // ) {
    //   provider = 'precise';
    // } else {
    //   throw new HttpException(401, 'Not Authorized!');
    // }
    const provider = 'teonengine';

    const res = await renderTemplate({
      provider,
      props: {
        link: body.link,
        image: imageUrl,
        banner: bannerUrl,
        subject: body.subject,
        message: body.message,
        content: body.content,
        template: body.template,
        hotPicks: body.hotPicks,
        description: body.description,
        economicReport: body.economicReport,
        podcastVlog: body.podcastVlogs,
      },
    });

    if (!res) throw new HttpException(400, 'Invalid template selected');

    return res;
  };

  public sendBulkMail = async (
    formData: FormData,
    userData: IManager,
    files: any
  ) => {
    const file = files.file as Blob;

    const banner = files.banner as Blob;

    const data = formData;

    const attachment = files.attachment as Blob;

    data['to'] = JSON.parse(data['to'] as unknown as string);
    if (data['cc']) {
      data['cc'] = JSON.parse(data['cc'] as unknown as string);
    }
    if (data['bcc']) {
      data['bcc'] = JSON.parse(data['bcc'] as unknown as string);
    }
    data['hotPicks'] = JSON.parse(data['hotPicks'] as unknown as string);
    data['economicReport'] = JSON.parse(
      data['economicReport'] as unknown as string
    );
    data['podcastVlogs'] = JSON.parse(
      data['podcastVlogs'] as unknown as string
    );

    const body = data as unknown as newsLetterValidationDto;

    //* use nodemailer here to create the mail
    //* possibly loop through the emails we are sending to, to add the unsubscribe button
    let sentCount = 0;
    let imageUrl!: string;
    let bannerUrl!: string;
    let attachmentUrl!: string;
    let attachmentName!: string;

    if (file) {
      const fileToUpload = file[0] as any;

      const fileBuffer = file[0].buffer;

      const subject = Date.now().toString();
      const uploadResult = await uploadImage(
        fileBuffer,
        fileToUpload.name,
        subject
      );

      if (uploadResult.httpStatusCode !== 200)
        throw new HttpException(
          uploadResult.httpStatusCode || 500,
          'Something went wrong uploading image!'
        );

      //* upload successful we wish to send to email
      imageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${subject}/${fileToUpload.name}`;
    }

    if (banner) {
      const fileToUpload = banner[0] as any;

      const fileBuffer = banner[0].buffer;

      const subject = Date.now().toString();
      const uploadResult = await uploadImage(
        fileBuffer,
        fileToUpload.name,
        subject
      );

      if (uploadResult.httpStatusCode !== 200)
        throw new HttpException(
          uploadResult.httpStatusCode || 500,
          'Something went wrong uploading image!'
        );

      //* upload successful we wish to send to email
      bannerUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${subject}/${fileToUpload.name}`;
    }

    if (attachment) {
      const fileToUpload = attachment[0] as any;

      const fileBuffer = attachment[0].buffer;

      const uploadResult = await uploadImage(
        fileBuffer,
        fileToUpload.name,
        'attachements'
      );

      if (uploadResult.httpStatusCode !== 200)
        throw new HttpException(
          uploadResult.httpStatusCode || 500,
          'Something went wrong uploading image!'
        );

      //* upload successful we wish to send to email
      attachmentName = fileToUpload.name;
      attachmentUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/attachements/${fileToUpload.name}`;
    }

    // let provider: 'precise' | 'teonengine';
    // if (userData.email === TEONENGINE_ADMIN_EMAIL) {
    //   provider = 'teonengine';
    // } else if (
    //   userData.email === PRECISE_POINT_ADMIN_EMAIL
    // ) {
    //   provider = 'precise';
    // } else {
    //   throw new HttpException(401, 'Not Authorized!');
    // }

    const provider = 'teonengine';
    // const batchedEmails = batchEmail(body.to);

    // let res;

    if (!body.template)
      throw new HttpException(400, 'Invalid template selected');

    if (body.to.length > 0) {
      const template = await renderTemplate({
        provider,
        props: {
          link: body.link,
          image: imageUrl,
          banner: bannerUrl,
          subject: body.subject,
          message: body.message,
          content: body.content,
          template: body.template,
          hotPicks: body.hotPicks,
          description: body.description,
          economicReport: body.economicReport,
          podcastVlog: body.podcastVlogs,
          attachemntUrl:
            body.template === 'newsletter' && attachmentUrl
              ? attachmentUrl
              : undefined,
        },
      });

      if (!template) throw new HttpException(400, 'Invalid template selected');

      let user;
      let pass;
      let username;

      //   if (provider === 'precise') {
      //     if (body.from) {
      //       user = fromUserPass.find((user) => user.name === body.from)?.user;
      //       pass = fromUserPass.find((user) => user.name === body.from)?.pass;
      //       username = fromUserPass.find(
      //         (user) => user.name === body.from
      //       )?.username;
      //     } else {
      //       user = PRECISE_POINT_NODEMAILER_EMAIL;
      //       pass = PRECISE_POINT_NODEMAILER_PASS;
      //       username = 'Precise Insight';
      //     }
      //   } else {
      //     if (body.from) {
      //       user = fromUserPass.find((user) => user.name === body.from)?.user;
      //       pass = fromUserPass.find((user) => user.name === body.from)?.pass;
      //       username = fromUserPass.find(
      //         (user) => user.name === body.from
      //       )?.username;
      //     } else {
      //       user = TEONENGINE_NODEMAILER_EMAIL;
      //       pass = TEONENGINE_NODEMAILER_PASS;
      //       username = 'Teonengine Newsletter';
      //     }
      //   }

      if (body.from) {
        user = fromUserPass.find((user) => user.name === body.from)?.user;
        pass = fromUserPass.find((user) => user.name === body.from)?.pass;
        username = fromUserPass.find(
          (user) => user.name === body.from
        )?.username;
      } else {
        user = NODEMAILER_EMAIL;
        pass = NODEMAILER_PASS;
        username = 'Teonengine Newsletter';
      }

      const batchSize = 50;
      const mailId = (Math.random() + 1).toString(36).substring(2);
      for (let i = 0; i < body.to.length; i += batchSize) {
        const batch = body.to.slice(i, i + batchSize);

        await agenda.schedule(new Date(), 'send-bulk-email', {
          from: {
            user,
            pass,
            username,
          },
          body: template,
          emails: body.to,
          subject: body.subject,
          socketId: body.socketId,
          cc: body.cc ? body.cc.join(',') : undefined,
          bcc: body.bcc ? body.bcc.join(',') : undefined,
          mailId,
          batch,
          total: body.to.length,
        });
      }
    }
  };
}

export default NewsletterService;

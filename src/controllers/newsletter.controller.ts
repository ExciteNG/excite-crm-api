// import NewsletterService from '@/services/newsletter.service';

// class NewsletterController {
//   public newletterService = new NewsletterService();

//   public sendNewsletter = async (req, res, next) => {
//     try {
//       const authUser = req.user;
//       const data = req.body;
//       const files = req.files;

//       await this.newletterService.sendNewsletter(authUser, data, files);

//       res.status(200).json({ message: 'Newsletter is being sent' });
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export default NewsletterController;

import { RequestWithUser } from '@/interfaces/auth.interface';
import { IUser } from '@/models/users.model';
import NewsletterService from '@/services/newsletter.service';
import { NextFunction, Request, Response } from 'express';

class NewsletterController {
  public newsletterService = new NewsletterService();

  public previewNewsletter = async (
    req: RequestWithUser<any, any, FormData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files;
      const formData = req.body;

      const userData = req.user;
      const preview = await this.newsletterService.previewNewsletter(
        formData,
        userData,
        files
      );

      res.status(200).json({
        message: 'Successful',
        data: preview,
      });
    } catch (error) {
      next(error);
    }
  };
  public sendBulkMail = async (
    req: RequestWithUser<any, any, FormData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files;
      const formData = req.body;
      //   console.log(formData);
      const userData = req.user;

      await this.newsletterService.sendBulkMail(formData, userData, files);

      res.status(200).json({
        message: 'Emails are being processed',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default NewsletterController;

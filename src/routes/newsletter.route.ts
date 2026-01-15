import NewsletterController from '@/controllers/newsletter.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';
import multer from 'multer';

/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Newsletter related endpoints
 */

class NewsletterRoutes {
  public path = '/newsletter';
  public router = Router();
  public upload = multer();
  public newsletterController = new NewsletterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /newsletter/preview:
     *   post:
     *     summary: Preview a newsletter
     *     tags: [Newsletter]
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               to:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: email
     *                 description: List of recipient email addresses
     *               cc:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: email
     *                 description: List of CC email addresses
     *               bcc:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: email
     *                 description: List of BCC email addresses
     *               from:
     *                 type: string
     *                 format: email
     *                 description: Sender's email address
     *               subject:
     *                 type: string
     *                 description: Email subject
     *               description:
     *                 type: string
     *                 description: Email description
     *               message:
     *                 type: string
     *                 description: Email message
     *               hotpicks:
     *                 type: string
     *                 description: Hotpicks
     *               economicReport:
     *                 type: string
     *                 description: Economic report
     *               podcastVlogs:
     *                 type: string
     *                 description: PodcastVlogs
     *               template:
     *                 type: string
     *                 description: Newsletter template
     *               file:
     *                 type: string
     *                 format: binary
     *                 description: The newsletter file to upload
     *               banner:
     *                 type: string
     *                 format: binary
     *                 description: The banner image for the newsletter
     *               attachment:
     *                 type: string
     *                 format: binary
     *                 description: Additional attachment for the newsletter
     *     responses:
     *       200:
     *         description: Newsletter preview generated successfully
     *       400:
     *         description: Invalid input data
     */

    this.router.post(
      `${this.path}/preview`,
      // authMiddleware,
      this.upload.fields([
        {
          name: 'file',
          maxCount: 1,
        },
        {
          name: 'banner',
          maxCount: 1,
        },
      ]),
      this.newsletterController.previewNewsletter
    );

    /**
     * @swagger
     * /newsletter/bulk/send/agenda:
     *   post:
     *     summary: Send bulk newsletter emails
     *     tags: [Newsletter]
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               to:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: email
     *                 description: List of recipient email addresses
     *               cc:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: email
     *                 description: List of CC email addresses
     *               bcc:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: email
     *                 description: List of BCC email addresses
     *               from:
     *                 type: string
     *                 format: email
     *                 description: Sender's email address
     *               subject:
     *                 type: string
     *                 description: Email subject
     *               description:
     *                 type: string
     *                 description: Email description
     *               message:
     *                 type: string
     *                 description: Email message
     *               hotpicks:
     *                 type: string
     *                 description: Hotpicks
     *               economicReport:
     *                 type: string
     *                 description: Economic report
     *               podcastVlogs:
     *                 type: string
     *                 description: PodcastVlogs
     *               socketId:
     *                 type: string
     *                 description: PodcastVlogs
     *               template:
     *                 type: string
     *                 description: Newsletter template
     *               file:
     *                 type: string
     *                 format: binary
     *                 description: The newsletter file to upload
     *               banner:
     *                 type: string
     *                 format: binary
     *                 description: The banner image for the newsletter
     *               attachment:
     *                 type: string
     *                 format: binary
     *                 description: Additional attachment for the newsletter
     *     responses:
     *       200:
     *         description: Newsletter preview generated successfully
     *       400:
     *         description: Invalid input data
     */

    this.router.post(
      `${this.path}/bulk/send/agenda`,
      // authMiddleware,
      this.upload.fields([
        {
          name: 'file',
          maxCount: 1,
        },
        {
          name: 'banner',
          maxCount: 1,
        },
        {
          name: 'attachment',
          maxCount: 1,
        },
      ]),
      this.newsletterController.sendBulkMail
    );
  }
}

export default NewsletterRoutes;

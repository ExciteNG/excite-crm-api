import NewsletterService from '@/services/newsletter.service';

class NewsletterController {
  public newletterService = new NewsletterService();

  public sendNewsletter = async (req, res, next) => {
    try {
      const authUser = req.user;
      const data = req.body;
      const files = req.files;

      await this.newletterService.sendNewsletter(authUser, data, files);

      res.status(200).json({ message: 'Newsletter is being sent' });
    } catch (error) {
      next(error);
    }
  };
}

export default NewsletterController;

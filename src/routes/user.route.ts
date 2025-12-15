import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import UserController from '@/controllers/user.controller';

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /user/excite-users:
     *   get:
     *     summary: Get all excite users
     *     tags: [User]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Excite Users verified successfully
     *       400:
     *         description: Invalid confirmation code
     */
    this.router.get(
      `${this.path}/excite-users`,
      authMiddleware,
      this.userController.getExciteUsers
    );
  }
}

export default UserRoute;

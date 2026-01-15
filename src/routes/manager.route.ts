import ManagerController from '@/controllers/manager.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import ValidationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Manager
 *   description: Manager related endpoints
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     LeadCreate:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phoneNumber:
 *           type: string
 *         businessName:
 *           type: string
 *         businessCategory:
 *           type: string
 *         source:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - phoneNumber
 *         - businessName
 *         - businessCategory
 *         - source
 *         - city
 *         - state
 *         - address
 *
 *     ManagerUpdate:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phoneNumber:
 *           type: string
 *         businessName:
 *           type: string
 *         businessCategory:
 *           type: string
 *         source:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         address:
 *           type: string
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - phoneNumber
 *         - businessName
 *         - businessCategory
 *         - source
 *         - city
 *         - state
 *         - address
 */

class ManagerRoute implements Routes {
  public path = '/managers';
  public router = Router();
  public managerController = new ManagerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /leads:
     *   get:
     *     summary: Get all managers
     *     tags: [Manager]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Managers retrieved successfully
     *       400:
     *         description: Invalid request
     */
    this.router.get(
      `${this.path}`,
      //   authMiddleware,
      this.managerController.getManagers
    );
  }
}

export default ManagerRoute;

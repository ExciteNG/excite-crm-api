import LeadController from '@/controllers/lead.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import ValidationMiddleware from '@/middlewares/validation.middleware';
import { createLeadSchema, updateLeadSchema } from '@/validator/lead.validator';
import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Lead
 *   description: Lead related endpoints
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
 *     LeadUpdate:
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

class LeadRoute implements Routes {
  public path = '/leads';
  public router = Router();
  public leadController = new LeadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /leads:
     *   get:
     *     summary: Get all leads
     *     tags: [Lead]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Leads retrieved successfully
     *       400:
     *         description: Invalid request
     */
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.leadController.getLeads
    );

    /**
     * @swagger
     * /leads/{id}:
     *   get:
     *     summary: Get lead by id
     *     tags: [Lead]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Lead id
     *     responses:
     *       200:
     *         description: Lead retrieved successfully
     *       404:
     *         description: Lead not found
     */
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.leadController.getLeadById
    );

    /**
     * @swagger
     * /leads:
     *   post:
     *     summary: Create a new lead
     *     tags: [Lead]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LeadCreate'
     *     responses:
     *       201:
     *         description: Lead created successfully
     *       400:
     *         description: Validation error
     */
    this.router.post(
      `${this.path}`,
      authMiddleware,
      ValidationMiddleware(createLeadSchema),
      this.leadController.createLead
    );

    /**
     * @swagger
     * /leads/{id}:
     *   put:
     *     summary: Update an existing lead
     *     tags: [Lead]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Lead id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LeadUpdate'
     *     responses:
     *       200:
     *         description: Lead updated successfully
     *       400:
     *         description: Validation error
     *       404:
     *         description: Lead not found
     */
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      ValidationMiddleware(updateLeadSchema),
      this.leadController.updateLead
    );
  }
}

export default LeadRoute;

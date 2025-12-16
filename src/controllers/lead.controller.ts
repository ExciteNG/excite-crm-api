import { NextFunction, Request, Response } from 'express';
import LeadService from '@/services/lead.service';

class LeadController {
  public leadService = new LeadService();

  public getLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leads = await this.leadService.getLeads();

      res
        .status(200)
        .json({ data: leads, message: 'Leads retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getLeadById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leadId = req.params.id;
      const lead = await this.leadService.getLeadById(leadId);

      res
        .status(200)
        .json({ data: lead, message: 'Lead retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public addLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leadData = req.body;
      const newLead = await this.leadService.createLead(leadData);

      res
        .status(201)
        .json({ data: newLead, message: 'Lead added successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createLead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leadData = req.body;
      const newLead = await this.leadService.createLead(leadData);

      res
        .status(201)
        .json({ data: newLead, message: 'Lead created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateLead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leadId = req.params.id;
      const updateData = req.body;
      const updatedLead = await this.leadService.updateLead(leadId, updateData);

      res
        .status(200)
        .json({ data: updatedLead, message: 'Lead updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeadController;

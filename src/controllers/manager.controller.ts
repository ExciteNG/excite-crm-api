import { NextFunction, Request, Response } from 'express';
import ManagerService from '@/services/manager.service';

class ManagerController {
  public managerService = new ManagerService();

  public getManagers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const managers = await this.managerService.getManagers();

      res
        .status(200)
        .json({ data: managers, message: 'Managers retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ManagerController;

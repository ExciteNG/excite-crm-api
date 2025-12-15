import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';

import UserService from '@/services/user.service';

class UserController {
  public userService = new UserService();

  public getExciteUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.userService.getExciteUsers();
      res
        .status(200)
        .json({ message: 'Excite users fetched successfully', data });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;

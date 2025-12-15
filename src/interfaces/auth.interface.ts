import { Request } from 'express';
import { IManager } from '@/models/manager.model';

export interface DataStoredInToken {
  _id: string | unknown;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser<
  P = Record<string, any>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = Record<string, any>, // Locals
  U = IManager,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: U;
}

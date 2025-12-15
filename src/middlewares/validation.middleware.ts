import { ZodError, ZodSchema } from 'zod';
import { Response, NextFunction, Request } from 'express';

import { HttpException } from '@exceptions/HttpException';

const ValidationMiddleware = function (schema: ZodSchema) {
  return function (
    req: Request<any, any, any, any>,
    _res: Response,
    next: NextFunction
  ) {
    try {
      const vr = schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      }) as any;

      // Do not reassign req.query (it's implemented as a getter on some runtimes).
      // Instead, copy validated values into the existing objects when possible,
      // and only set the property if it doesn't already exist as an object.
      if (vr.body !== undefined) {
        if (req.body && typeof req.body === 'object') {
          Object.assign(req.body, vr.body);
        } else {
          (req as any).body = vr.body;
        }
      }

      if (vr.params !== undefined) {
        if (req.params && typeof req.params === 'object') {
          Object.assign(req.params, vr.params);
        } else {
          (req as any).params = vr.params;
        }
      }

      if (vr.query !== undefined) {
        if (req.query && typeof req.query === 'object') {
          Object.assign(req.query as Record<string, unknown>, vr.query);
        } else {
          // If req.query is not present as an object, set it (rare in Express).
          (req as any).query = vr.query;
        }
      }

      return next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        const first = e.issues[0];
        const path = Array.isArray(first.path) ? first.path.join('.') : String(first.path || '');
        const message = `${path ? path + ' ' : ''}${first.message.toLowerCase()}`;
        throw new HttpException(400, message);
      } else {
        // cast to Error for message
        const err = e as Error;
        next(new HttpException(400, err.message || 'Validation error'));
      }
    }
  };
};

export default ValidationMiddleware;

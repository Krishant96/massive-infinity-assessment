import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

export const validator = (schema: Joi.ObjectSchema, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error === undefined || null;

    if (valid) {
      next();
    } else {
      if (error) {
        const { details } = error;
        const message = details
          .map((i: { message: unknown }) => i.message)
          .join(',');

        res.status(422).json({ error: message });
      }
    }
  };
};

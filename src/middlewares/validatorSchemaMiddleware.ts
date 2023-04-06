import { Request, Response, NextFunction } from "express";
import errorsCategory from "../errors/index.js";
import { ObjectSchema } from "joi";

export function validateSchema(schema : ObjectSchema){
  return (req: Request, res: Response, next: NextFunction) => {

    const { error } = schema.validate(req.body, { abortEarly: false });
    if(error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errorsCategory.invalidDataError(errors));
    }

    next();
  }
}
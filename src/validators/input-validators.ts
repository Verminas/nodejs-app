import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const titleValidator = body('title').isString().trim().notEmpty().escape()
export const errorsValidate = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req)
  if(!result.isEmpty()) {
    res.status(400).send({ errors: result.array() });
  } else {
    next()
  }
}
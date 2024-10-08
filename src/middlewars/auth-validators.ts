import {NextFunction, Request, Response} from "express";
import {authorizationRepository} from "../repositories/authorizationRepository";

export const authValidator = (req: Request, res: Response, next: NextFunction) => {
  if(authorizationRepository.isBasicAuthUser(req.headers.authorization || '')) {
    next()
  } else {
    res.status(401).send({message: 'Authentication failed'});
  }
}
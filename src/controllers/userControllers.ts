import { NextFunction, Request, Response } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    
    return res.send('OK');
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signin,
}
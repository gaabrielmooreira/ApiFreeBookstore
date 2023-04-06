import { NextFunction, Request, Response } from "express";
import userServices from "../services/userServices.js";
import { SignInUser, CreateUser } from "../protocols/protocols.js";

async function create(req: Request, res: Response, next: NextFunction){
  const { name, email, password } = req.body as CreateUser;
  try {
    await userServices.create({ name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as SignInUser;
  try {
    const token = await userServices.signIn({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  signIn,
}
import { NextFunction, Response } from "express";
import errorsCategory from "../errors/index.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { AuthenticatedRequest, JWTPayload } from "../protocols/protocols.js";
import userRepositories from "../repositories/userRepositories.js";
dotenv.config();

export async function authValidate(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw errorsCategory.unauthorizedError();

  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2) throw errorsCategory.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== 'Bearer') throw errorsCategory.unauthorizedError();

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY) as JWTPayload;

    const { rowCount } = await userRepositories.findById({ id: userId });
    if (!rowCount) throw errorsCategory.unauthorizedError();

    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
}
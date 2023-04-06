import { NextFunction, Response } from "express";
import { AuthenticatedRequest, ReqBodyCreateBook } from "../protocols/protocols.js";
import bookServices from "../services/bookServices.js";

async function create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { name, author } = req.body as ReqBodyCreateBook;
  const userId = req.userId;

  try {
    await bookServices.create({ name, author, userId });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const books = await bookServices.findAll();
    return res.send(books);
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await bookServices.takeBook({ userId, bookId: Number(id)});
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function findAllMyBooks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  try {
    const books = await bookServices.findAllMyBooks({userId});
    return res.send(books);
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  findAll,
  takeBook,
  findAllMyBooks,
}
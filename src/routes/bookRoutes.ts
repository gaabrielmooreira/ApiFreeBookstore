import { Router } from "express";
import { authValidate } from "../middlewares/authValidatorMiddleware.js";
import { validateSchema } from "../middlewares/validatorSchemaMiddleware.js";
import { bookSchema } from "../schemas/bookSchemas.js";
import bookControllers from "../controllers/bookControllers.js";

const bookRoutes: Router = Router();

bookRoutes.post(
  "/",
  authValidate,
  validateSchema(bookSchema),
  bookControllers.create
);

bookRoutes.get(
  "/",
  authValidate,
  bookControllers.findAll
);

bookRoutes.post(
  "/take-book/:id",
  authValidate,
  bookControllers.takeBook
);

bookRoutes.get(
  "/my-books",
  authValidate,
  bookControllers.findAllMyBooks
);

export default bookRoutes;
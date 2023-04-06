import { Router } from "express";
import usersController from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/validatorSchemaMiddleware.js";
import { signInSchema, signUpSchema } from "../schemas/usersSchema.js";
var userRoutes = Router();
userRoutes.post("/signup", validateSchema(signUpSchema), usersController.create);
userRoutes.post("/signin", validateSchema(signInSchema), usersController.signin);
export default userRoutes;

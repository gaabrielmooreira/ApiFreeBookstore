import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import { validateSchema } from "../middlewares/validatorSchemaMiddleware.js";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";
var userRoutes = Router();
userRoutes.post("/signup", validateSchema(signUpSchema), userControllers.create);
userRoutes.post("/signin", validateSchema(signInSchema), userControllers.signIn);
export default userRoutes;

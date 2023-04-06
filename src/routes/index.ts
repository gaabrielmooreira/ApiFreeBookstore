import { Router } from "express";
import bookRoutes from "./bookRoutes.js";
import userRoutes from "./userRoutes.js";

const routes: Router = Router();

routes.use("/books", bookRoutes);
routes.use("/users", userRoutes);

export default routes;
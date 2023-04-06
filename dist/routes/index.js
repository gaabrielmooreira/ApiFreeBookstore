import { Router } from "express";
import bookRoutes from "./bookRoutes.js";
import userRoutes from "./userRoutes.js";
var routes = Router();
routes.use("/books", bookRoutes);
routes.use("/users", userRoutes);
export default routes;

import express from "express";
import { login, signup } from "./auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/login",login);
AuthRouter.post("/signup", signup);

export { AuthRouter };

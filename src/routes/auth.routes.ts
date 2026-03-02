import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";

const authRouter = Router();

// Register route
authRouter.post("/register", validate(registerSchema), register);

// Login route
authRouter.post("/login", validate(loginSchema), login);

export default authRouter;

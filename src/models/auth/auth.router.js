import { Router } from "express";
import { registerUser, verifyEmail } from "./auth.controller.js";
import { validate } from "../../common/middleware/middleware.validate.js";
import { registerValidation } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/register", validate(registerValidation), registerUser);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;

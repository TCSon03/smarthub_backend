import { Router } from "express";
import {
  loginUser,
  registerUser,
  resendVerificationEmail,
  verifyEmail,
} from "./auth.controller.js";
import { validate } from "../../common/middleware/middleware.validate.js";
import { loginValidation, registerValidation } from "./auth.validation.js";

const authRouter = Router();

authRouter.post("/register", validate(registerValidation), registerUser);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/resend-verify-email", resendVerificationEmail);
authRouter.post("/login", validate(loginValidation), loginUser);
export default authRouter;

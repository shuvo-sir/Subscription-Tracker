import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/log-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.post('/log-out', signOut);

export default authRouter;
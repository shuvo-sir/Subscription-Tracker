import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ title: "Get all users route" }));

export default userRouter;

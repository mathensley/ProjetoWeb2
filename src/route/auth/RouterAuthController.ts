import { Router, Request, Response } from "express";
import { AuthController } from "../../controller/auth/AuthController";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/api/auth", 
    (request: Request, response: Response) => {authController.login(request, response)}
);

export default authRouter;
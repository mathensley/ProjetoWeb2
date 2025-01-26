import { Router } from "express";
import { Request, Response } from "express";
import { AuthController } from "../../controller/auth/AuthController.js";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/v1/auth", 
    (request: Request, response: Response) => {authController.login(request, response)}
);

export default authRouter;
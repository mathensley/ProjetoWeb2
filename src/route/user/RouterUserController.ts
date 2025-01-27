import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { UserController } from "../../controller/user/UserController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const usersRouter = Router();

const userControler = new UserController();
const authService = new AuthService();

usersRouter.get("/v1/users/:id", 
    authService.verifyToken, (request: Request, response: Response) => {userControler.findById(request, response)}
);

usersRouter.get("/v1/users", 
    authService.verifyToken, 
    authService.grantRole("ADMIN"), 
    (request: Request, response: Response) => {userControler.getAll(request, response)}
);

usersRouter.post("/v1/users", 
    (request: Request, response: Response) => {userControler.register(request, response)}
);

usersRouter.delete("/v1/users/:id",
    (request: Request, response: Response) => {userControler.delete(request, response)}
);

usersRouter.delete("/v1/users",
    (request: Request, response: Response) => {userControler.deleteAll(request, response)}
);

export default usersRouter;
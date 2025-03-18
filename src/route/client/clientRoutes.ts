import { NextFunction, Router, Request, Response } from "express";
import { CreateClientController } from '../../controller/client/CreateClientController';
import { GetClientController } from "../../controller/client/GetClientController";
import { GetClientByIdController } from "../../controller/client/GetClientByIdController";
import { DeleteClientController } from "../../controller/client/DeleteClientController";
import { UpdateClientController } from "../../controller/client/UpdateClientController";
import { AuthService } from "../../service/auth/AuthService";

const clientRoutes = Router();

const authService = new AuthService();
const createClientController = new CreateClientController();
const getClientController = new GetClientController();
const getClientByIdController = new GetClientByIdController();
const deleteClientController = new DeleteClientController();
const updateClientController = new UpdateClientController();

clientRoutes.post("/api/clients", 
    (request: Request, response: Response) => {createClientController.handle(request, response)}
);
clientRoutes.get("/api/clients", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {getClientController.handle(request, response)}
);
clientRoutes.get("/api/clients/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleClient(request, response, next),
    (request: Request, response: Response) => {getClientByIdController.handle(request, response)}
);
clientRoutes.delete("/api/clients/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleClient(request, response, next),
    (request: Request, response: Response) => {deleteClientController.handle(request, response)}
);
clientRoutes.patch("/api/clients/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleClient(request, response, next),
    (request: Request, response: Response) => {updateClientController.handle(request, response)}
);

export default clientRoutes;
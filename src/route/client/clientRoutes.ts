import { Router } from "express";
import { Request, Response } from "express";
import { CreateClientController } from '../../controller/client/CreateClientController.js';
import { GetClientsController } from "../../controller/client/GetClientsController.js";
import { DeleteClientController } from "../../controller/client/DeleteClientController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const getClientsController = new GetClientsController();
const deleteClientController = new DeleteClientController();

clientRoutes.post("/api/clients", (request: Request, response: Response) => {createClientController.handle(request, response)});
clientRoutes.get("/api/clients", (request: Request, response: Response) => {getClientsController.handle(request, response)});
clientRoutes.delete("/api/clients/:id", (request: Request, response: Response) => {deleteClientController.handle(request, response)});

export default clientRoutes;
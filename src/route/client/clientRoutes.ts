import { Router } from "express";
import { Request, Response } from "express";
import { CreateClientController } from '../../controller/client/CreateClientController.js';
import { GetClientController } from "../../controller/client/GetClientController.js";
import { GetClientByIdController } from "../../controller/client/GetClientByIdController.js";
import { UpdateClientController } from "../../controller/client/UpdateClientController.js";
import { DeleteClientController } from "../../controller/client/DeleteClientController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const getClientController = new GetClientController();
const getClientByIdController = new GetClientByIdController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

clientRoutes.post("/api/clients", (request: Request, response: Response) => {createClientController.handle(request, response)});
clientRoutes.get("/api/clients", (request: Request, response: Response) => {getClientController.handle(request, response)});
clientRoutes.get("/api/clients/:id", (request: Request, response: Response) => {getClientByIdController.handle(request, response)});
clientRoutes.put("/api/clients/:id", (request: Request, response: Response) => {updateClientController.handle(request, response)});
clientRoutes.delete("/api/clients/:id", (request: Request, response: Response) => {deleteClientController.handle(request, response)});

export default clientRoutes;
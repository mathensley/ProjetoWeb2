import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { CreateClientController } from '../../controller/client/CreateClientController.js';
import { GetClientController } from "../../controller/client/GetClientController.js";
import { GetClientByIdController } from "../../controller/client/GetClientByIdController.js";
import { DeleteClientController } from "../../controller/client/DeleteClientController.js";
import { UpdateClientController } from "../../controller/client/UpdateClientController.js";
import validateClient from "../../main/validation/validateClient.js";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const getClientController = new GetClientController();
const getClientByIdController = new GetClientByIdController();
const deleteClientController = new DeleteClientController();
const updateClientController = new UpdateClientController();

clientRoutes.post("/api/clients",
    (request: Request, response: Response, next: NextFunction) => {validateClient(request, response, next)},
    (request: Request, response: Response) => {createClientController.handle(request, response)});
clientRoutes.get("/api/clients", (request: Request, response: Response) => {getClientController.handle(request, response)});
clientRoutes.get("/api/clients/:id", (request: Request, response: Response) => {getClientByIdController.handle(request, response)});
clientRoutes.delete("/api/clients/:id", (request: Request, response: Response) => {deleteClientController.handle(request, response)});
clientRoutes.patch("/api/clients/:id", (request: Request, response: Response) => {updateClientController.handle(request, response)});

export default clientRoutes;
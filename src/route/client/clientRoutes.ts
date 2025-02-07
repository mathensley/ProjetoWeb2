import { Router } from "express";
import { Request, Response } from "express";
import { CreateClientController } from '../../controller/client/CreateClientController.js';
import { GetClientController } from "../../controller/client/GetClientController.js";
import { GetClientByIdController } from "../../controller/client/GetClientByIdController.js";
import { DeleteClientController } from "../../controller/client/DeleteClientController.js";
import { UpdateClientController } from "../../controller/client/UpdateClientController.js";
import { UpdateAddressClientController } from "../../controller/client/UpdateAddressClientController.js";
import { UpdatePhoneClientController } from "../../controller/client/UpdatePhoneClientController.js";
import { UpdateUsernameClientController } from "../../controller/client/UpdateUsernameClientController.js";
import { UpdatePasswordClientController } from "../../controller/client/UpdatePasswordClientController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const getClientController = new GetClientController();
const getClientByIdController = new GetClientByIdController();
const deleteClientController = new DeleteClientController();
const updateClientController = new UpdateClientController();
const updateAddressClientController = new UpdateAddressClientController();
const updatePhoneClientController = new UpdatePhoneClientController();
const updateUsernameClientController = new UpdateUsernameClientController();
const updatePasswordClientController = new UpdatePasswordClientController();

clientRoutes.post("/api/clients", (request: Request, response: Response) => {createClientController.handle(request, response)});
clientRoutes.get("/api/clients", (request: Request, response: Response) => {getClientController.handle(request, response)});
clientRoutes.get("/api/clients/:id", (request: Request, response: Response) => {getClientByIdController.handle(request, response)});
clientRoutes.delete("/api/clients/:id", (request: Request, response: Response) => {deleteClientController.handle(request, response)});
clientRoutes.put("/api/clients/:id", (request: Request, response: Response) => {updateClientController.handle(request, response)});
clientRoutes.patch("/api/clients/address/:id", (request: Request, response: Response) => {updateAddressClientController.handle(request, response)});
clientRoutes.patch("/api/clients/phone/:id", (request: Request, response: Response) => {updatePhoneClientController.handle(request, response)});
clientRoutes.patch("/api/clients/username/:id", (request: Request, response: Response) => {updateUsernameClientController.handle(request, response)});
clientRoutes.patch("/api/clients/password/:id", (request: Request, response: Response) => {updatePasswordClientController.handle(request, response)});

export default clientRoutes;
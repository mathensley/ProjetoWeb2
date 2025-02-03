import { Router } from "express";
import { Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService.js";
import { GetEstablishmentByIdController } from "../../controller/establishment/GetEstablishmentByIdController.js";
import { GetEstablishmentController } from "../../controller/establishment/GetEstablishmentController.js";
import { DeleteEstablishmentByIdController } from "../../controller/establishment/DeleteEstablishmentByIdController.js";
import { CreateEstablishmentController } from "../../controller/establishment/CreateEstablishmentController.js";
import { UpdateEstablishmentController } from "../../controller/establishment/UpdateEstablishmentController.js";

const establishmentsRouter = Router();

const authService = new AuthService();
const createEstablishmentController = new CreateEstablishmentController();
const deleteEstablishmentByIdController = new DeleteEstablishmentByIdController();
const getEstablishmentController = new GetEstablishmentController();
const updateEstablishmentController = new UpdateEstablishmentController();
const getEstablishmentByIdController = new GetEstablishmentByIdController();

establishmentsRouter.post("/v1/establishments", 
    authService.verifyToken, 
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {createEstablishmentController.handle(request, response)}
);

establishmentsRouter.get("/v1/establishments/:id", 
    authService.verifyToken,
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {getEstablishmentByIdController.handle(request, response)}
);

establishmentsRouter.get("/v1/establishments", 
    authService.verifyToken,
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {getEstablishmentController.handle(request, response)}
);

establishmentsRouter.put("/v1/establishments", 
    authService.verifyToken,
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {updateEstablishmentController.handle(request, response)}
);

establishmentsRouter.delete("/v1/establishments/:id", 
    authService.verifyToken, 
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {deleteEstablishmentByIdController.handle(request, response)}
);

export default establishmentsRouter;
import { Router } from "express";
import { Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService.js";
import { EstablishmentGetUniqueController } from "../../controller/establishment/EstablishmentGetUniqueController.js";
import { EstablishmentGetAllController } from "../../controller/establishment/EstablishmentGetAllController.js";
import { EstablishmentDeleteUniqueController } from "../../controller/establishment/EstablishmentDeleteUniqueController.js";
import { EstablishmentDeleteAllController } from "../../controller/establishment/EstablishmentDeleteAllController.js";
import { EstablishmentPostController } from "../../controller/establishment/EstablishmentPostController.js";

const establishmentsRouter = Router();

const authService = new AuthService();
const establishmentPostController = new EstablishmentPostController();
const establishmentGetUniqueController = new EstablishmentGetUniqueController();
const establishmentGetAllController = new EstablishmentGetAllController();
const establishmentDeleteUniqueController = new EstablishmentDeleteUniqueController();
const establishmentDeleteAllController = new EstablishmentDeleteAllController();

establishmentsRouter.post("/v1/establishments", 
    authService.verifyToken, 
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {establishmentPostController.handle(request, response)}
);

establishmentsRouter.get("/v1/establishments/:id", 
    authService.verifyToken,
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {establishmentGetUniqueController.handle(request, response)}
);

establishmentsRouter.get("/v1/establishments", 
    authService.verifyToken,
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {establishmentGetAllController.handle(request, response)}
);

establishmentsRouter.delete("/v1/establishments", authService.verifyToken,
    authService.verifyToken,
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {establishmentDeleteUniqueController.handle(request, response)}
);

establishmentsRouter.delete("/v1/establishments/:id", 
    authService.verifyToken, 
    authService.grantRole("ADMIN"),
    (request: Request, response: Response) => {establishmentDeleteAllController.handle(request, response)}
);

export default establishmentsRouter;
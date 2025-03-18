import { Request, Router, Response, NextFunction } from "express";
import { GetEstablishmentByIdController } from "../../controller/establishment/GetEstablishmentByIdController";
import { GetEstablishmentController } from "../../controller/establishment/GetEstablishmentController";
import { DeleteEstablishmentByIdController } from "../../controller/establishment/DeleteEstablishmentByIdController";
import { CreateEstablishmentController } from "../../controller/establishment/CreateEstablishmentController";
import { UpdateEstablishmentController } from "../../controller/establishment/UpdateEstablishmentController";
import { validateEstablishment } from "../../../main/validation/validateEstablishment.js";
import { AuthService } from "../../service/auth/AuthService";

const establishmentsRouter = Router();

const authService = new AuthService();
const createEstablishmentController = new CreateEstablishmentController();
const deleteEstablishmentByIdController = new DeleteEstablishmentByIdController();
const getEstablishmentController = new GetEstablishmentController();
const updateEstablishmentController = new UpdateEstablishmentController();
const getEstablishmentByIdController = new GetEstablishmentByIdController();

establishmentsRouter.post("/api/establishments", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response, next: NextFunction) => {validateEstablishment(request, response, next)},
    (request: Request, response: Response) => {createEstablishmentController.handle(request, response)}
);

establishmentsRouter.get("/api/establishments/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {getEstablishmentByIdController.handle(request, response)}
);

establishmentsRouter.get("/api/establishments", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {getEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {updateEstablishmentController.handle(request, response)}
);

establishmentsRouter.delete("/api/establishments/:id", 
    authService.verifyToken, 
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {deleteEstablishmentByIdController.handle(request, response)}
);

export default establishmentsRouter;
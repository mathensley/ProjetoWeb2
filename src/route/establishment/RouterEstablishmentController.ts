import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../service/auth/AuthService.js";
import { GetEstablishmentByIdController } from "../../controller/establishment/GetEstablishmentByIdController.js";
import { GetEstablishmentController } from "../../controller/establishment/GetEstablishmentController.js";
import { DeleteEstablishmentByIdController } from "../../controller/establishment/DeleteEstablishmentByIdController.js";
import { CreateEstablishmentController } from "../../controller/establishment/CreateEstablishmentController.js";
import { UpdateEstablishmentController } from "../../controller/establishment/UpdateEstablishmentController.js";
import { UpdateAddressEstablishmentController } from "../../controller/establishment/UpdateAddressEstablishmentController.js";
import { UpdateCEPEstablishmentController } from "../../controller/establishment/UpdateCEPEstablishmentController.js";
import { UpdateCityEstablishmentController } from "../../controller/establishment/UpdateCityEstablishmentController.js";
import { UpdateEmailEstablishmentController } from "../../controller/establishment/UpdateEmailEstablishmentController.js";
import { UpdateNameEstablishmentController } from "../../controller/establishment/UpdateNameEstablishmentController.js";
import { UpdatePhoneEstablishmentController } from "../../controller/establishment/UpdatePhoneEstablishmentController.js";
import { UpdateStateEstablishmentController } from "../../controller/establishment/UpdateStateEstablishmentController.js";

const establishmentsRouter = Router();

const authService = new AuthService();

const createEstablishmentController = new CreateEstablishmentController();
const deleteEstablishmentByIdController = new DeleteEstablishmentByIdController();
const getEstablishmentController = new GetEstablishmentController();
const updateEstablishmentController = new UpdateEstablishmentController();
const getEstablishmentByIdController = new GetEstablishmentByIdController(); 
const updateAddressEstablishmentController = new UpdateAddressEstablishmentController();
const updateCEPEstablishmentController = new UpdateCEPEstablishmentController();
const updateCityEstablishmentController = new UpdateCityEstablishmentController();
const updateEmailEstablishmentController = new UpdateEmailEstablishmentController();
const updateNameEstablishmentController = new UpdateNameEstablishmentController();
const updatePhoneEstablishmentController = new UpdatePhoneEstablishmentController();
const updateStateEstablishmentController = new UpdateStateEstablishmentController();

establishmentsRouter.post("/api/establishments", 
    authService.verifyToken, 
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {createEstablishmentController.handle(request, response)}
);

establishmentsRouter.get("/api/establishments/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {getEstablishmentByIdController.handle(request, response)}
);

establishmentsRouter.get("/api/establishments", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {getEstablishmentController.handle(request, response)}
);

establishmentsRouter.put("/api/establishments", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/address/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateAddressEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/cep/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateCEPEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/city/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateCityEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/email/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateEmailEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/name/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateNameEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/phone/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updatePhoneEstablishmentController.handle(request, response)}
);

establishmentsRouter.patch("/api/establishments/state/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {updateStateEstablishmentController.handle(request, response)}
);

establishmentsRouter.delete("/api/establishments/:id", 
    authService.verifyToken, 
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRole(request, response, next),
    (request: Request, response: Response) => {deleteEstablishmentByIdController.handle(request, response)}
);

export default establishmentsRouter;
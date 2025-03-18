import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { CreateDeliveryRiderController } from "../../controller/delivery_rider/CreateDeliveryRiderController";
import { GetDeliveryRiderController } from "../../controller/delivery_rider/GetDeliveryRiderController";
import { GetDeliveryRiderByIdController } from "../../controller/delivery_rider/GetDeliveryRiderByIdController";
import { DeleteDeliveryRiderController } from "../../controller/delivery_rider/DeleteDeliveryRiderController";
import { UpdateDeliveryRiderController } from "../../controller/delivery_rider/UpdateDeliveryRiderController";
import { UpdatePasswordDeliveryRiderController } from "../../controller/delivery_rider/UpdatePasswordDeliveryRiderController";
import { validateDeliveryRider } from "../../main/validation/validateDeliveryRider.js";
import { AuthService } from "../../service/auth/AuthService";

const deliveryRoutes = Router();

const authService = new AuthService();
const createDeliveryRiderController = new CreateDeliveryRiderController();
const getDeliveryRiderController = new GetDeliveryRiderController();
const getDeliveryRiderByIdController = new GetDeliveryRiderByIdController();
const deleteDeliveryRiderController =  new DeleteDeliveryRiderController();
const updateDeliveryRiderController = new UpdateDeliveryRiderController();
const updatePasswordDeliveryRiderController = new UpdatePasswordDeliveryRiderController();

deliveryRoutes.post("/api/delivery_riders", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response, next: NextFunction) => {validateDeliveryRider(request, response, next)},
    (request: Request, response: Response) => {createDeliveryRiderController.handle(request, response)}
);
deliveryRoutes.get("/api/delivery_riders", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {getDeliveryRiderController.handle(request, response)}
);
deliveryRoutes.get("/api/delivery_riders/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleDeliveryRider(request, response, next),
    (request: Request, response: Response) => {getDeliveryRiderByIdController.handle(request, response)}
);
deliveryRoutes.delete("/api/delivery_riders/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {deleteDeliveryRiderController.handle(request, response)}
);
deliveryRoutes.put("/api/delivery_riders/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleDeliveryRider(request, response, next),
    (request: Request, response: Response) => {updateDeliveryRiderController.handle(request, response)}
);
deliveryRoutes.patch("/api/delivery_riders/password/:id", 
    authService.verifyToken,
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleDeliveryRider(request, response, next),
    (request: Request, response: Response) => {updatePasswordDeliveryRiderController.handle(request, response)}
);

export default deliveryRoutes;
import { Router } from "express";
import { Request, Response } from "express";
import { CreateDeliveryRiderController } from "../../controller/delivery_rider/CreateDeliveryRiderController.js";
import { GetDeliveryRiderController } from "../../controller/delivery_rider/GetDeliveryRiderController.js";
import { GetDeliveryRiderByIdController } from "../../controller/delivery_rider/GetDeliveryRiderByIdController.js";
import { DeleteDeliveryRiderController } from "../../controller/delivery_rider/DeleteDeliveryRiderController.js";
import { UpdateDeliveryRiderController } from "../../controller/delivery_rider/UpdateDeliveryRiderController.js";
import { UpdatePasswordDeliveryRiderController } from "../../controller/delivery_rider/UpdatePasswordDeliveryRiderController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const deliveryRoutes = Router();

const createDeliveryRiderController = new CreateDeliveryRiderController();
const getDeliveryRiderController = new GetDeliveryRiderController();
const getDeliveryRiderByIdController = new GetDeliveryRiderByIdController();
const deleteDeliveryRiderController =  new DeleteDeliveryRiderController();
const updateDeliveryRiderController = new UpdateDeliveryRiderController();
const updatePasswordDeliveryRiderController = new UpdatePasswordDeliveryRiderController();

deliveryRoutes.post("/api/delivery_riders", (request: Request, response: Response) => {createDeliveryRiderController.handle(request, response)});
deliveryRoutes.get("/api/delivery_riders", (request: Request, response: Response) => {getDeliveryRiderController.handle(request, response)});
deliveryRoutes.get("/api/delivery_riders/:id", (request: Request, response: Response) => {getDeliveryRiderByIdController.handle(request, response)});
deliveryRoutes.delete("/api/delivery_riders/:id", (request: Request, response: Response) => {deleteDeliveryRiderController.handle(request, response)});
deliveryRoutes.put("/api/delivery_riders/:id", (request: Request, response: Response) => {updateDeliveryRiderController.handle(request, response)});
deliveryRoutes.patch("/api/delivery_riders/password/:id", (request: Request, response: Response) => {updatePasswordDeliveryRiderController.handle(request, response)});

export default deliveryRoutes;
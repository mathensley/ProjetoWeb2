import { Router } from "express";
import { Request, Response } from "express";
import { CreateDeliveryRiderController } from "../../controller/delivery_rider/CreateDeliveryRiderController.js";
import { GetDeliveryRiderController } from "../../controller/delivery_rider/GetDeliveryRiderController.js";
import { DeleteDeliveryRiderController } from "../../controller/delivery_rider/DeleteDeliveryRiderController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const deliveryRoutes = Router();

const createDeliveryRiderController = new CreateDeliveryRiderController();
const getDeliveryRiderController = new GetDeliveryRiderController();
const deleteDeliveryRiderController =  new DeleteDeliveryRiderController();

deliveryRoutes.post("/api/delivery_riders", (request: Request, response: Response) => {createDeliveryRiderController.handle(request, response)});
deliveryRoutes.get("/api/delivery_riders", (request: Request, response: Response) => {getDeliveryRiderController.handle(request, response)});
deliveryRoutes.delete("/api/delivery_riders/:id", (request: Request, response: Response) => {deleteDeliveryRiderController.handle(request, response)});

export default deliveryRoutes;
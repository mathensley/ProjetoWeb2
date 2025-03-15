import { Request, Response } from "express";
import { DeliveryRider } from "@prisma/client";
import { CreateDeliveryRiderService } from "../../service/delivery_rider/CreateDeliveryRiderService.js";

export class CreateDeliveryRiderController {
    private createDeliveryRiderService: CreateDeliveryRiderService;

    constructor() {
        this.createDeliveryRiderService = new CreateDeliveryRiderService();
    }

    async handle(request: Request, response: Response) {
        try {
            const data: DeliveryRider = request.body;

            const delivery_rider: DeliveryRider = await this.createDeliveryRiderService.create(data);

            return response.status(201).json(delivery_rider);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An expected error ocurred.", 
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}
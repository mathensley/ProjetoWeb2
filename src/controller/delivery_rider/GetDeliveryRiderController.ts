import { Request, Response } from "express";
import { DeliveryRider } from "@prisma/client";
import { GetDeliveryRiderService } from "../../service/delivery_rider/GetDeliveryRiderService";

export class GetDeliveryRiderController {
    private getDeliveryRiderService: GetDeliveryRiderService;

    constructor() {
        this.getDeliveryRiderService = new GetDeliveryRiderService();
    }

    async handle(request: Request, response: Response) {
        try {
            const delivery_riders: DeliveryRider[] | null = await this.getDeliveryRiderService.getAll();
            return response.status(200).json(delivery_riders);
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
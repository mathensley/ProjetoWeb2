import { Request, Response } from "express";
import { DeliveryRider } from "@prisma/client";
import { GetDeliveryRiderByIdService } from "../../service/delivery_rider/GetDeliveryRiderByIdService";

export class GetDeliveryRiderByIdController {
    private getDeliveryRiderByIdService: GetDeliveryRiderByIdService;

    constructor() {
        this.getDeliveryRiderByIdService = new GetDeliveryRiderByIdService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const delivery_rider: DeliveryRider = await this.getDeliveryRiderByIdService.get(id);

            return response.status(200).json(delivery_rider);
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
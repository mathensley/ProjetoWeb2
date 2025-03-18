import { Request, Response } from "express";
import { DeliveryRider } from "@prisma/client";
import { UpdateDeliveryRiderService } from "../../service/delivery_rider/UpdateDeliveryRiderService";

export class UpdateDeliveryRiderController {
    private updateDeliveryRiderService: UpdateDeliveryRiderService;

    constructor() {
        this.updateDeliveryRiderService = new UpdateDeliveryRiderService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const updateData: DeliveryRider = request.body;

            const updatedRider = await this.updateDeliveryRiderService.update(id, updateData);
            return response.status(200).json(updatedRider);
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
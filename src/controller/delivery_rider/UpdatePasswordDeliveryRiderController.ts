import { Request, Response } from "express";
import { UpdatePasswordDeliveryRiderService } from "../../service/delivery_rider/UpdatePasswordDeliveryRiderService";

export class UpdatePasswordDeliveryRiderController {
    private updatePasswordDeliveryRiderService: UpdatePasswordDeliveryRiderService;

    constructor() {
        this.updatePasswordDeliveryRiderService = new UpdatePasswordDeliveryRiderService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { password } = request.body;

            const updatedRider = await this.updatePasswordDeliveryRiderService.update(String(id), String(password));
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
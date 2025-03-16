import { Request, Response } from "express";
import { DeleteDeliveryRiderService } from "../../service/delivery_rider/DeleteDeliveryRiderService";

export class DeleteDeliveryRiderController {
    private deleteDeliveryRiderService: DeleteDeliveryRiderService;

    constructor() {
        this.deleteDeliveryRiderService = new DeleteDeliveryRiderService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;

            await this.deleteDeliveryRiderService.delete(String(id));
            return response.status(200).json({message: "Delivery Rider deleted successfully."});
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
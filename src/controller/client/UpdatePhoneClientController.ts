import { Request, Response } from "express";
import { UpdatePhoneClientService } from "../../service/client/UpdatePhoneClientService.js";

export class UpdatePhoneClientController {
    private updatePhoneClientService: UpdatePhoneClientService;

    constructor() {
        this.updatePhoneClientService = new UpdatePhoneClientService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { phone } = request.body;

            const updatedClient = await this.updatePhoneClientService.update(String(id), String(phone));
            return response.status(200).json(updatedClient);
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
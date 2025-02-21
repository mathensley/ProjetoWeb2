import { Request, Response } from "express";
import { UpdatePasswordClientService } from "../../service/client/UpdatePasswordClientService.js";

export class UpdatePasswordClientController {
    private updatePasswordClientService: UpdatePasswordClientService;

    constructor() {
        this.updatePasswordClientService = new UpdatePasswordClientService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { password } = request.body;

            const updatedClient = await this.updatePasswordClientService.update(String(id), String(password));
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
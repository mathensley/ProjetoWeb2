import { Request, Response } from "express";
import { UpdateClientService } from "../../service/client/UpdateClientService";

export class UpdateClientController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const updateData = request.body;

            const updateClientService = new UpdateClientService();
            const updatedClient = await updateClientService.update(id, updateData);

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
import { Request, Response } from "express";
import { DeleteClientService } from "../../service/client/DeleteClientService";

export class DeleteClientController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const deleteClientService = new DeleteClientService();
            await deleteClientService.delete(String(id));
            return response.status(200).json({message: "Client deleted successfully."});
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
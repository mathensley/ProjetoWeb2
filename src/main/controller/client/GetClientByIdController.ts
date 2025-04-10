import { Request, Response } from "express";
import { GetClientByIdService } from "../../service/client/GetClientByIdService";

export class GetClientByIdController {
    async handle(request: Request, response: Response) {
        try {
            const id = request.clientId;

            const getClientByIdService = new GetClientByIdService();
            const client = await getClientByIdService.get(String(id));
            
            return response.status(200).json(client);
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
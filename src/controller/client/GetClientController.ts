import { Request, Response } from "express";
import { GetClientService } from "../../service/client/GetClientService.js";

export class GetClientController {
    async handle(request: Request, response: Response) {
        try {
            const getClientsService = new GetClientService();
            const clients = await getClientsService.getAll();
            return response.status(200).json(clients);
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
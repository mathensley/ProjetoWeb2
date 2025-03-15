import { Request, Response } from "express";
import { CreateClientService } from "../../service/client/CreateClientService.js";

export class CreateClientController {
    async handle(request: Request, response: Response) {
        try {
            const {
                name,
                username,
                password,
                cpf,
                email,
                phone,
                address,
                city,
                state,
                cep,
                establishmentId
            } = request.body;

            const createClientService = new CreateClientService();
            const client = await createClientService.create({
                name,
                username,
                password,
                cpf,
                email,
                phone,
                address,
                city,
                state,
                cep,
                establishmentId
            });

            return response.status(201).json(client);
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
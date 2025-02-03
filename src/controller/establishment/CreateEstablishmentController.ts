import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { CreateEstablishmentService } from "../../service/establishment/CreateEstablishmentService.js";

export class CreateEstablishmentController {
    private createEstablishmentService: CreateEstablishmentService; 

    constructor() {
        this.createEstablishmentService = new CreateEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const data: Establishment = request.body;

        try {
            const productResponse: Establishment = await this.createEstablishmentService.create(data);
            return response.status(200).json(productResponse);

        } catch(error) {
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
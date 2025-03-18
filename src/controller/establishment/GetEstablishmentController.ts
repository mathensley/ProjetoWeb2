import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { GetEstablishmentService } from "../../service/establishment/GetEstablishmentService";

export class GetEstablishmentController {
    private getEstablishmentService: GetEstablishmentService;

    constructor() {
        this.getEstablishmentService = new GetEstablishmentService();
    }

    async handle(request: Request, response: Response) {

        try {
            const responseProducts: Establishment[] | null = await this.getEstablishmentService.get();    
            return response.status(200).json(responseProducts);

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
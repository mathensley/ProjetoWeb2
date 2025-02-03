import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { GetEstablishmentService } from "../../service/establishment/GetEstablishmentService.js";

export class GetEstablishmentController {
    private getEstablishmentService: GetEstablishmentService;

    constructor() {
        this.getEstablishmentService = new GetEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const responseProducts: Establishment[] | null = await this.getEstablishmentService.get();    
        return response.status(200).json(responseProducts);
    }
}
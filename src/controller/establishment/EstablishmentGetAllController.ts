import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { EstablishmentGetAllService } from "../../service/establishment/EstablishmentGetAllService.js";

export class EstablishmentGetAllController {
    private establishmentGetAllService: EstablishmentGetAllService;

    constructor() {
        this.establishmentGetAllService = new EstablishmentGetAllService();
    }

    async handle(request: Request, response: Response) {
        const responseProducts: Establishment[] | null = await this.establishmentGetAllService.handle();    
        return response.status(200).json(responseProducts);
    }
}
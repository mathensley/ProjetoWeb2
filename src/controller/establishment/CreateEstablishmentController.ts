import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { CreateEstablishmentService } from "../../service/establishment/CreateEstablishmentService.js";
import { BcryptUtil } from "../../utils/BCryptUtils.js";
import { errors_auth_code } from "../../utils/ErrorsCode.js";

export class CreateEstablishmentController {
    private createEstablishmentService: CreateEstablishmentService; 

    constructor() {
        this.createEstablishmentService = new CreateEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const data: Establishment = request.body;
        const tokenHeader = request.headers["authorization"];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (!token) {
            return response.json(400).json(errors_auth_code.INVALID_TOKEN)
        }

        try {
            const id = await BcryptUtil.getId(token);
            data.adminId = id
            
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
import { Request, Response } from "express";
import { Admin } from "@prisma/client";
import { CreateAdminService } from "../../service/admin/CreateAdminService.js";

export class CreateAdminController {
    private createAdminService: CreateAdminService;

    constructor() {
        this.createAdminService = new CreateAdminService();
    }

    async handle(request: Request, response: Response) {
        try {
            const data: Admin = request.body;

            const admin: Admin = await this.createAdminService.create(data);
            return response.status(200).json(admin);
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
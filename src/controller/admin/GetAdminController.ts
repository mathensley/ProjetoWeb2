import { Request, Response } from "express";
import { Admin } from "@prisma/client";
import { GetAdminService } from "../../service/admin/GetAdminService.js";

export class GetAdminController {
    private getAdminService: GetAdminService;

    constructor() {
        this.getAdminService = new GetAdminService();
    }

    async handle(request: Request, response: Response) {
        try {
            const admins: Admin[] | null = await this.getAdminService.getAll();
            return response.status(200).json(admins);
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
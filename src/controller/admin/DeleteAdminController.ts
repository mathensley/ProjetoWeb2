import { Request, Response } from "express";
import { DeleteAdminService } from "../../service/admin/DeleteAdminService.js";

export class DeleteAdminController {
    private deleteAdminService: DeleteAdminService;

    constructor() {
        this.deleteAdminService = new DeleteAdminService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;

            await this.deleteAdminService.delete(id);
            return response.status(200).json({message: "Admin deleted successfully."});
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
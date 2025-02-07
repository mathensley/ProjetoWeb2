import { Request, Response } from "express";
import { UpdateUsernameClientService } from "../../service/client/UpdateUsernameClientService.js";

export class UpdateUsernameClientController {
    private updateUsernameClientService: UpdateUsernameClientService;
    
        constructor() {
            this.updateUsernameClientService = new UpdateUsernameClientService();
        }
    
        async handle(request: Request, response: Response) {
            try {
                const { id } = request.params;
                const { username } = request.body;
    
                const updatedClient = await this.updateUsernameClientService.update(String(id), String(username));
                return response.status(200).json(updatedClient);
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
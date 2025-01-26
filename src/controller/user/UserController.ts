import { Request, Response } from "express";
import { User } from "@prisma/client";
import { GetUserService } from "../../service/user/GetUserService.js";
import { RegisterUserService } from "../../service/user/RegisterUserService.js";

export class UserController {
    private getUserService: GetUserService;
    private registerUserService: RegisterUserService;

    constructor() {
        this.getUserService = new GetUserService();
        this.registerUserService = new RegisterUserService();
    }

    async register(request: Request, response: Response) {
        const { name, cpf, password, role } = request.body;

        try {
            const userResponse: User = await this.registerUserService.register(name, cpf, password, role);
            return response.status(200).json(userResponse);

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

    async getAll(request: Request, response: Response) {
        try {
            const responseProducts: User[] | null = await this.getUserService.getAll();

            return response.status(200).json(responseProducts);
        } catch(error) {
            
            return response.status(401).json({
                message: "Unauthorized"
            })
        }
    }

    async findById(request: Request, response: Response) {
        const { id, password } = request.params

        try {
            const responseUsers: User[] | null = await this.getUserService.findById(String(id));
            
            return response.status(200).json(responseUsers);

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
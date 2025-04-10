import { Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService";
import { errors_auth_code } from "../../utils/ErrorsCode";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(request: Request, response: Response) {
        const { cpf, password } = request.body;
    
        try {
            if (cpf && password) {
                const token = await this.authService.login(cpf, password);
                response.status(200).json({
                    token
                });
            } else {
                throw new Error(errors_auth_code.INVALID_CPF_OR_PASSWORD);
            }

        } catch(error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    message: error.message
                });
            }
            return response.status(500).json({
                message: errors_auth_code.INVALID_UNRECOGNIZED_ERROR
            })
        }
    }
}
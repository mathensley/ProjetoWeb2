import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { GetUserService } from "../user/GetUserService.js";
import { BCrtyptUtils } from "./BCryptUtils.js";
import { errors_auth_code } from "../../utils/ErrorsCode.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET

export class AuthService {
    private getUserService: GetUserService;

    constructor() {
        this.getUserService = new GetUserService();
    }

    async login(cpf: string, password: string) {
        if (!SECRET) {
            throw new Error(errors_auth_code.INVALID_SECRET_KEY);
        } 

        try {
            const userRecovery: User[] | null = await this.getUserService.findByCpf(cpf);
            
            if (!userRecovery) {
                throw new Error(errors_auth_code.INVALID_USER_BY_CPF);
            }

            const user: User = userRecovery[0];
            const validationPassword = BCrtyptUtils.comparePassword(password, user.password);

            if (!validationPassword) {
                throw Error(errors_auth_code.INVALID_PASSWORD);
            }

            const token = jwt.sign({cpf: user.cpf}, SECRET);

            return token;

        } catch(error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async verifyToken(request: Request, response: Response, next: NextFunction) {
        const tokenHeader = request.headers["authorization"];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (!SECRET) {
            throw new Error(errors_auth_code.INVALID_SECRET_KEY);
        }
        
        if (!token) {
            throw new Error(errors_auth_code.INVALID_TOKEN);
        }

        try {
            jwt.verify(token, SECRET);
            next();

        } catch(error) {
            throw new Error(errors_auth_code.INVALID_TOKEN_EXPIRED);
        }
    } 

    grantRole(...allowedRoles: string[]) {
        return async (request: Request, response: Response, next: NextFunction) => {
            const tokenHeader = request.headers["authorization"];
            const token = tokenHeader && tokenHeader.split(" ")[1];

            if (token) {
                try {
                    const cpf = await BCrtyptUtils.getCpfByToken(token);
                    const userResponse = await this.getUserService.findByCpf(cpf);

                    if (userResponse) {
                        const user: User = userResponse[0];
                        
                        if (allowedRoles.includes(user.role)) {
                            next();
                        }
                    }
                } catch(error: unknown) {
                    if (error instanceof Error) {
                        response.status(500).json({
                            message: error.message
                        })
                    }
                }
            } else {
                response.status(401).json({
                    message: errors_auth_code.INVALID_TOKEN
                });
            }
        }
    } 
}
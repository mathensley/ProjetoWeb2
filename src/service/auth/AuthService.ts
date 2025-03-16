import { Admin, Client, DeliveryRider } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BcryptUtil } from "../../utils/BCryptUtils.js";
import { errors_auth_code } from "../../utils/ErrorsCode.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaClient } from "../../database/PrismaClient.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET

export class AuthService {
    async login(cpf: string, password: string) {
        if (!SECRET) {
            throw new Error(errors_auth_code.INVALID_SECRET_KEY);
        } 

        try {
            let recovery: Admin | Client | DeliveryRider| null = await prismaClient.admin.findUnique({where: {cpf}});
            
            if (!recovery) {
                recovery = await prismaClient.client.findUnique({where: {cpf}});

                if (!recovery) {
                    recovery = await prismaClient.deliveryRider.findUnique({where: {cpf}});

                    if (!recovery) {
                        throw new Error(errors_auth_code.INVALID_USER);
                    }
                } 
            }

            const validationPassword = await BcryptUtil.comparePassword(password, recovery.password);
            if (!validationPassword) {
                throw Error(errors_auth_code.INVALID_PASSWORD);
            }

            const token = jwt.sign({id: recovery.id}, SECRET);
            return token;

        } catch(error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(errors_auth_code.INVALID_UNKNOWN);
            }
        }
    }

    async verifyToken(request: Request, response: Response, next: NextFunction) {
        const tokenHeader = request.headers["authorization"];
        console.log(request.headers)
        const token = tokenHeader && tokenHeader.split(" ")[1];

        try {
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
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P") {
                response.status(500).json({
                    message: error.message
                });
            } else if (error instanceof Error) {
                response.status(500).json({
                    message: error.message
                });
            } else {
                response.status(500).json({
                    message: errors_auth_code.INVALID_UNKNOWN
                });
            }
        }
    } 

    async authorizeRoleAdmin(request: Request, response: Response, next: NextFunction) {
        const tokenHeader = request.headers["authorization"];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (token) {
            try {
                const id = await BcryptUtil.getId(token);
                const adminResponse: Admin | null = await prismaClient.admin.findUnique({where: {id}});

                if (adminResponse) {
                    next();
                } else {
                    response.status(500).json({
                        message: errors_auth_code.INVALID_ROLE_UNAUTHORIZED
                    });
                }

            } 
            catch(error: unknown) {
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

    async authorizeRoleDeliveryRider(request: Request, response: Response, next: NextFunction) {
        const tokenHeader = request.headers["authorization"];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (token) {
            try {
                const id = await BcryptUtil.getId(token);
                const deliveryRider: Admin | null = await prismaClient.deliveryRider.findUnique({where: {id}});

                if (deliveryRider) {
                    next();
                } else {
                    response.status(500).json({
                        message: errors_auth_code.INVALID_ROLE_UNAUTHORIZED
                    });
                }

            } 
            catch(error: unknown) {
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

    async authorizeRoleClient(request: Request, response: Response, next: NextFunction) {
        const tokenHeader = request.headers["authorization"];
        const token = tokenHeader && tokenHeader.split(" ")[1];

        if (token) {
            try {
                const id = await BcryptUtil.getId(token);
                const client: Client | null = await prismaClient.client.findUnique({where: {id}});

                if (client) {
                    next();
                } else {
                    response.status(500).json({
                        message: errors_auth_code.INVALID_ROLE_UNAUTHORIZED
                    });
                }

            } 
            catch(error: unknown) {
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
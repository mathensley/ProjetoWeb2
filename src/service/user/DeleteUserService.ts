import { Request, response } from "express";
import { errors_user_code } from "../../utils/ErrorsCode.js";
import { prismaClient } from "../../database/PrismaClient.js";
import { BCrtyptUtils } from "../auth/BCryptUtils.js";
import {  } from "@prisma/client/runtime/library";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/react-native.js";
import { User } from "@prisma/client";

export class DeleteUserService {

    async delete(request: Request, id: string) {
        try {
            const tokenHeader = request.headers["authorization"];
            const token = tokenHeader && tokenHeader.split(" ")[1];

            if (!token) {
                throw new Error(errors_user_code.INVALID_TOKEN);
            }

            const cpf: string = await BCrtyptUtils.getCpfByToken(token);
            const user: User | null = await prismaClient.user.findUnique({where: {cpf}});

            if (!user) {
                throw new Error(errors_user_code.INVALID_USER_BY_CPF);
            }

            if (user.cpf !== cpf) {
                if (user.role !== "ADMIN") {
                    throw new Error(errors_user_code.INVALID_USER_ROLE_ADMIN);
                }
                throw new Error(errors_user_code.INVALID_USER_BY_CPF);
            }

            await prismaClient.user.delete({where: {id}});
            
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_CPF);
            } 
        }
    }

    async deleteAll(request: Request) {

        try {
            const tokenHeader = request.headers["authorization"];
            const token = tokenHeader && tokenHeader.split(" ")[1];

            if (!token) {
                throw new Error(errors_user_code.INVALID_TOKEN);
            }

            const cpf: string = await BCrtyptUtils.getCpfByToken(token);
            const user: User | null = await prismaClient.user.findUnique({where: {cpf}});

            if (!user) {
                throw new Error(errors_user_code.INVALID_USER_BY_CPF);
            }

            if (user.role !== "ADMIN") {
                throw new Error(errors_user_code.INVALID_USER_ROLE_ADMIN);
            }

            await prismaClient.user.deleteMany();
            
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_CPF);
            } 
        }
    }
}
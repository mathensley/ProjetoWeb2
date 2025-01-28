import { User } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_auth_code, errors_user_code } from "../../utils/ErrorsCode.js";

export class GetUserService {

    public async getAll(): Promise<User[] | undefined> {
        try {
            return await prismaClient.user.findMany();
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
        }
    }

    public async findById(id: string): Promise<User[] | null> {
        try {
            const response = await prismaClient.user.findUnique({where: {id}});

            if (response) {
                return [response];
            }

            return null;

        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_ID);
            }
            throw new Error(errors_auth_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }

    public async findByCpf(cpf: string): Promise<User[] | null> {
        try {
            const response = await prismaClient.user.findUnique({where: {cpf}});
            
            if (response) {
                return [response];
            }

            throw new Error(errors_user_code.INVALID_USER_BY_CPF);

        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_CPF);
            }
            throw new Error(errors_auth_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
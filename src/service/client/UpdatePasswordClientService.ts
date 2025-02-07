import { Client } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BcryptUtil } from "../../utils/BCryptUtils.js";
import { errors_user_code } from "../../utils/ErrorsCode.js";

export class UpdatePasswordClientService {
    async update(id: string, password: string): Promise<Client> {
        try {
            const hashedPass = await BcryptUtil.hashPassword(password);
            const updatedClient = await prismaClient.client.update({where: {id}, data: {password: hashedPass}});
            return updatedClient;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Client not found.");
            }
            throw errors_user_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
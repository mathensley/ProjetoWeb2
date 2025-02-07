import { Client } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_user_code } from "../../utils/ErrorsCode.js";

export class UpdatePhoneClientService {
    async update(id: string, phone: string): Promise<Client> {
        try {
            const updatedClient = await prismaClient.client.update({where: {id}, data: {phone}});
            return updatedClient;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Client not found.");
            }
            throw errors_user_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
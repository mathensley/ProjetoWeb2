import { Client } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_user_code } from "../../utils/ErrorsCode.js";

type AddressUpdateData = {
    adress?: string;
    city?: string;
    state?: string;
    cep?: string;
};

export class UpdateAddressClientService {
    async update(id: string, data: AddressUpdateData): Promise<Client> {
        try {
            const updatedClient = await prismaClient.client.update({where: {id}, data});
            return updatedClient;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Client not found.");
            }
            throw errors_user_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
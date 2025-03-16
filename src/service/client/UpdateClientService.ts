import { PrismaClient } from '@prisma/client';
import { BcryptUtil } from "../../utils/BCryptUtils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UpdateClientService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async update(id: string, data: {
        name: string;
        username: string;
        password: string;
        cpf: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        cep: string;
        establishmentId?: string;
    }) {
        try {
            if (data.password) {
                data.password = await BcryptUtil.hashPassword(data.password);
            }
            const updatedClient = await this.prismaClient.client.update({where: {id}, data});
            return updatedClient;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Client not found.");
            }
            throw error;
        }
    }
}
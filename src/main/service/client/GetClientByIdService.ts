import { Client, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetClientByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async get(id: string): Promise<Client> {
        try {
            const client = await this.prismaClient.client.findUnique({where: {id}});
            if (!client) {
                throw new Error("Client not found");
            }
            return client;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
            throw error;
        }

    }
}
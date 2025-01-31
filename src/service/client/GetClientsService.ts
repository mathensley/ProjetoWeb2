import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetClientsService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getAll() {
        try {
            return await this.prismaClient.client.findMany();
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
        }
    }
}
import { DeliveryRider } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetDeliveryRiderService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    async getAll(): Promise<DeliveryRider[]> {
        try {
            return await this.prismaClient.deliveryRider.findMany();
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
            throw error;
        }
    }
}
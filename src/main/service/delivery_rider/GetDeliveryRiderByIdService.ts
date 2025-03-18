import { DeliveryRider } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetDeliveryRiderByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async get(id: string): Promise<DeliveryRider> {
        try {
            const delivery_rider = await this.prismaClient.deliveryRider.findUnique({where: {id}});
            if (!delivery_rider) {
                throw new Error("Delivery Rider not found.");
            }
            return delivery_rider;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
            throw error;
        }
    }
}
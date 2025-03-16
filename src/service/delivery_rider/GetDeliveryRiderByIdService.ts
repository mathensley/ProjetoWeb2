import { DeliveryRider } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetDeliveryRiderByIdService {
    async get(id: string): Promise<DeliveryRider> {
        try {
            const delivery_rider = await prismaClient.deliveryRider.findUnique({where: {id}});
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
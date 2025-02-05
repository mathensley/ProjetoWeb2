import { DeliveryRider } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetDeliveryRiderService {
    async getAll(): Promise<DeliveryRider[]> {
        try {
            return await prismaClient.deliveryRider.findMany();
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
            throw error;
        }
    }
}
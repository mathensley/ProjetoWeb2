import { DeliveryRider } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { BcryptUtil } from "../../utils/BCryptUtils.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UpdateDeliveryRiderService {
    async update(id: string, data: DeliveryRider): Promise<DeliveryRider> {
        try {
            if (data.password) {
                data.password = await BcryptUtil.hashPassword(data.password);
            }
            const updatedRider: DeliveryRider = await prismaClient.deliveryRider.update({where: {id}, data});
            return updatedRider;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Delivery Rider not found.");
            }
            throw error;
        }
    }
}
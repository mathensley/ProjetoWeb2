import { DeliveryRider } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BcryptUtil } from "../../utils/BCryptUtils";
import { errors_user_code } from "../../utils/ErrorsCode";

export class UpdatePasswordDeliveryRiderService {
    async update(id: string, password: string): Promise<DeliveryRider> {
        try {
            const hashedPass = await BcryptUtil.hashPassword(password);
            const updatedRider = await prismaClient.deliveryRider.update({where: {id}, data: {password: hashedPass}});
            return updatedRider;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new Error("Delivery Rider not found.");
            }
            throw errors_user_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
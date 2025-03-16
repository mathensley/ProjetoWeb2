import { DeliveryRider } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient";
import { BcryptUtil } from "../../utils/BCryptUtils";
import { errors_user_code } from "../../utils/ErrorsCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CreateDeliveryRiderService {
    async create(data: DeliveryRider): Promise<DeliveryRider> {
        try {
            const hashedPass = await BcryptUtil.hashPassword(data.password);
            return await prismaClient.deliveryRider.create({
                data: {
                    ...data, 
                    password: hashedPass
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_ID);
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_establishment_code } from "../../utils/ErrorsCode.js";

export class UpdatePromotionProductService {
    public async update(id: string, promotion: boolean): Promise<Product> {
        try {
            const updatedProduct = await prismaClient.product.update({where: {id}, data: {promotion}});
            return updatedProduct;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            }
            throw errors_establishment_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_establishment_code } from "../../utils/ErrorsCode.js";

export class UpdatePriceProductService {
    public async update(id: string, price: number): Promise<Product> {
        try {
            const updatedProduct = await prismaClient.product.update({where: {id}, data: {price}});4
            return updatedProduct;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            }
            throw errors_establishment_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
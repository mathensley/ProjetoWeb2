import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { errors_establishment_code } from "../../utils/ErrorsCode.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UpdateNameProductService {
    public async update(id: string, name: string): Promise<Product> {
        try {
            const updatedProduct = await prismaClient.product.update({where: {id}, data: {name}});
            return updatedProduct;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            }
            throw errors_establishment_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
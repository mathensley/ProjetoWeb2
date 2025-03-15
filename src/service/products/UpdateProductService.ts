import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode.js";

export class UpdateProductService {

    async update(id: string, product: Product): Promise<Product> {
        try {
            const response = await prismaClient.product.update({where: {id}, data: product});
            return response;
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }
            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
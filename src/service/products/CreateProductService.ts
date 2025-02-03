import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { errors_product_code } from "../../utils/ErrorsCode.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CreateProductService {
    public async create(data: Product): Promise<Product> {

        try {
            return await prismaClient.product.create({data});
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            }
            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
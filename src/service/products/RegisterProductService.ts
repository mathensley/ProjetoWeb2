import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { errors_product_code } from "../../utils/ErrorsCode.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class RegisterProductService {
    public async register(name: string, description: string, price: number): Promise<Product> {

        try {
            return prismaClient.product.create({data: {name, description, price}});
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            }
            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
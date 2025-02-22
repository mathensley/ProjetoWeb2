import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode.js";

export class GetProductByIdService {

    public async get(id: string): Promise<Product[]> {
        try {
            const product = await prismaClient.product.findUnique({where: {id}});

            if (!product) {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }

            return [product];

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            }


            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
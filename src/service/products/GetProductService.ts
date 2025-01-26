import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode.js";

export class GetProductService {
    public async getAll(): Promise<Product[]> {
        return await prismaClient.product.findMany();
    }

    public async get(id: string): Promise<Product[] | null> {
        try {
            const response = await prismaClient.product.findUnique({where: {id}});

            if (response) {
                return [response];
            }

            return null;

        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            }
            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
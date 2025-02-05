import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";

export class GetProductService {
    public async get(): Promise<Product[]> {
        return await prismaClient.product.findMany();
    }
}
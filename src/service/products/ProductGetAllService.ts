import { Product } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";

export class ProductGetAllService {
    public async handle(): Promise<Product[]> {
        return await prismaClient.product.findMany();
    }
}
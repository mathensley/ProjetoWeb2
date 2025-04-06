import { PrismaClient } from "@prisma/client";
import { errors_product_code } from "../../utils/ErrorsCode";

import fs from "fs";
import path from "path";

const uploadFolder = path.resolve(__dirname, "../../utils/image/product_imgs");

export class DeleteProductService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async delete(id: string) {
        try {
            const product = await this.prismaClient.product.findUnique({ where: { id } });

            if (!product) {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }

            await this.prismaClient.product.delete({ where: { id } });

            if (product.image) {
                const imagePath = path.join(uploadFolder, product.image);

                if (fs.existsSync(imagePath)) {
                    await fs.promises.unlink(imagePath);
                }
            }
        } catch(error: any) {            
            if (error.code == "P2025") {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }

            throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
        }
    }
}
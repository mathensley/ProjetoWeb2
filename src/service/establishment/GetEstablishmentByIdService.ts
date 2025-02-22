import { Establishment } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { errors_establishment_code, errors_product_code } from "../../utils/ErrorsCode.js";

export class GetEstablishmentByIdService {
    public async get(id: string): Promise<Establishment[]> {
        try {
            const establishment = await prismaClient.establishment.findUnique({where: {id}});
    
            if (!establishment) {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            }
    
            return [establishment];
    
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
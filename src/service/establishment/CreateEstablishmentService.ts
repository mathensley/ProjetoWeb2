import { Establishment } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_establishment_code, errors_product_code } from "../../utils/ErrorsCode.js";

export class CreateEstablishmentService {
    public async create(data: Establishment): Promise<Establishment> {

        try {
            return await prismaClient.establishment.create({data});
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_ALREADY_EXIST);
            }
            
            throw new Error(errors_establishment_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
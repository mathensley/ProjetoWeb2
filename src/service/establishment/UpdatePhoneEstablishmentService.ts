import { Establishment } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_establishment_code } from "../../utils/ErrorsCode.js";

export class UpdatePhoneEstablishmentService {
    public async update(id: string, phone: string): Promise<Establishment> {
        try {
            const updatedProduct = await prismaClient.establishment.update({where: {id}, data: {phone}});
            return updatedProduct;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            }
            throw errors_establishment_code.INVALID_UNRECOGNIZED_ERROR;
        }
    }
}
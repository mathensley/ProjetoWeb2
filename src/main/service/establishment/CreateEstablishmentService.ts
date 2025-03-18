import { Establishment } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_establishment_code } from "../../utils/ErrorsCode";

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
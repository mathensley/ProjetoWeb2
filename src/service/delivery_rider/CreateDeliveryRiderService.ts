import { PrismaClient, DeliveryRider } from "@prisma/client";
import { BcryptUtil } from "../../utils/BCryptUtils";
import { errors_user_code } from "../../utils/ErrorsCode";

export class CreateDeliveryRiderService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    public async create(data: DeliveryRider): Promise<DeliveryRider> {
        try {
            if (data.cpf.length != 11) {
                throw new Error("Invalid CPF");
            }
            if (data.password.length < 6) {
                throw new Error("There must be a password");
            }
            const hashedPass = await BcryptUtil.hashPassword(data.password);
            return await this.prismaClient.deliveryRider.create({
                data: {
                    ...data, 
                    password: hashedPass
                }
            });
        } catch (error: any) {
            if (error.code === "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_ID);
            } else if (error.message === "Invalid CPF" || error.message === "There must be a password") {
                throw error;
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}
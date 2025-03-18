import { DeliveryRider } from "@prisma/client";
import { prismaClient } from "../../main/database/PrismaClient";
import { CreateDeliveryRiderService } from "../../main/service/delivery_rider/CreateDeliveryRiderService";
import { BcryptUtil } from "../../main/utils/BCryptUtils";
import { errors_user_code } from "../../main/utils/ErrorsCode";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                deliveryRider: {
                    create: jest.fn(),
                },
            };
        }),
    };
});

jest.mock("../../main/utils/BCryptUtils", () => {
    return {
        BcryptUtil: {
            hashPassword: jest.fn(),
        },
    };
});

describe("CreateDeliveryRiderService", () => {
    let createDeliveryRiderService: CreateDeliveryRiderService;
    let riderData: any;

    beforeEach(() => {
        createDeliveryRiderService = new CreateDeliveryRiderService(prismaClient);
        riderData = {
            name: "Entregador Teste",
            password: "senha123",
            license_plate: "ABC1234",
            cpf: "12345678901",
            establishmentId: '1'
        };
        prismaClient.deliveryRider.create = jest.fn().mockResolvedValue(riderData);
        createDeliveryRiderService.create(riderData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve criar um entregador com sucesso", async () => {
        const hashedPassword = "hashedPassword123";
        (BcryptUtil.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const newRider: DeliveryRider = { ...riderData, password: hashedPassword };
        prismaClient.deliveryRider.create = jest.fn().mockResolvedValue(newRider);

        const result = await createDeliveryRiderService.create(riderData);

        expect(BcryptUtil.hashPassword).toHaveBeenCalledWith("senha123");
        expect(prismaClient.deliveryRider.create).toHaveBeenCalledWith({
            data: { ...newRider, password: hashedPassword }
        });
        expect(result).toEqual(newRider);
    });

    it("deve falhar ao tentar criar um entregador com CPF inválido", async () => {
        const newRider = {
            ...riderData,
            cpf: "12345678", // CPF inválido
        };

        prismaClient.deliveryRider.create = jest.fn().mockResolvedValue(newRider);

        await expect(createDeliveryRiderService.create(newRider)).rejects.toThrow("Invalid CPF");
    });

    it("deve falhar ao tentar criar um entregador com CPF ou placa já existentes", async () => {
        const error = new Error(errors_user_code.INVALID_USER_BY_ID);
        (prismaClient.deliveryRider.create as jest.Mock).mockRejectedValue({
            code: "P2002",
        });
    
        await expect(createDeliveryRiderService.create(riderData)).rejects.toThrow(error);
    });

    it("deve falhar ao tentar criar um entregador sem senha", async () => {
        const riderWithoutPassword = {
            ...riderData,
            password: "",
        };
    
        await expect(createDeliveryRiderService.create(riderWithoutPassword)).rejects.toThrow("There must be a password");
    });
});
import { prismaClient } from "../../main/database/PrismaClient";
import { GetDeliveryRiderService } from "../../main/service/delivery_rider/GetDeliveryRiderService";
import { GetDeliveryRiderByIdService } from "../../main/service/delivery_rider/GetDeliveryRiderByIdService";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                deliveryRider: {
                    findMany: jest.fn(),
                    findUnique: jest.fn(),
                },
            };
        }),
    };
});

describe("GetDeliveryRiderService", () => {
    let getDeliveryRiderService: GetDeliveryRiderService;
    let getDeliveryRiderByIdService: GetDeliveryRiderByIdService;

    beforeEach(() => {
        getDeliveryRiderService = new GetDeliveryRiderService(prismaClient);
        getDeliveryRiderByIdService = new GetDeliveryRiderByIdService(prismaClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar a lista de todos os entregadores", async () => {
        const riders = [
            { id: "uuid-1", name: "Entregador 1", cpf: "12345678901", license_plate: "ABC1234" },
            { id: "uuid-2", name: "Entregador 2", cpf: "98765432101", license_plate: "XYZ5678" },
        ];

        prismaClient.deliveryRider.findMany = jest.fn().mockResolvedValue(riders);

        const result = await getDeliveryRiderService.getAll();

        expect(prismaClient.deliveryRider.findMany).toHaveBeenCalled();
        expect(result).toEqual(riders);
    });

    it("deve retornar um entregador específico pelo ID", async () => {
        const riderId = "uuid-123";
        const rider = { id: riderId, name: "Entregador Teste", cpf: "12345678901", license_plate: "ABC1234" };

        prismaClient.deliveryRider.findUnique = jest.fn().mockResolvedValue(rider);

        const result = await getDeliveryRiderByIdService.get(riderId);

        expect(prismaClient.deliveryRider.findUnique).toHaveBeenCalledWith({
            where: { id: riderId },
        });
        expect(result).toEqual(rider);
    });

    it("deve falhar ao buscar um entregador que não existe", async () => {
        const riderId = "uuid-999";

        prismaClient.deliveryRider.findUnique = jest.fn().mockResolvedValue(null);

        await expect(getDeliveryRiderByIdService.get(riderId)).rejects.toThrow("Delivery Rider not found");

        expect(prismaClient.deliveryRider.findUnique).toHaveBeenCalledWith({
            where: { id: riderId },
        });
    });
});
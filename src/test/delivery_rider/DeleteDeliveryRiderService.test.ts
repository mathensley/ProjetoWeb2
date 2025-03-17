import { prismaClient } from "../../database/PrismaClient";
import { DeleteDeliveryRiderService } from "../../service/delivery_rider/DeleteDeliveryRiderService";
import { errors_user_code } from "../../utils/ErrorsCode";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                deliveryRider: {
                    delete: jest.fn(),
                    findUnique: jest.fn(),
                },
            };
        }),
    };
});

describe("DeleteDeliveryRiderService", () => {
    let deleteDeliveryRiderService: DeleteDeliveryRiderService;
    let riderId: string

    beforeEach(() => {
        deleteDeliveryRiderService = new DeleteDeliveryRiderService(prismaClient);
        riderId = "uuid-123";
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve excluir um entregador com sucesso", async () => {
        prismaClient.deliveryRider.delete = jest.fn().mockResolvedValue({ id: riderId });

        const result = await deleteDeliveryRiderService.delete(riderId);

        await expect(deleteDeliveryRiderService.delete(riderId)).resolves.not.toThrow();
        expect(prismaClient.deliveryRider.delete).toHaveBeenCalledWith({ where: { id: riderId } });
    });

    it("deve falhar ao tentar excluir um entregador que não existe", async () => {
        prismaClient.deliveryRider.delete = jest.fn().mockRejectedValue({ code: "P2025" });

        await expect(deleteDeliveryRiderService.delete(riderId)).rejects.toThrow("Delivery Rider not found");
        expect(prismaClient.deliveryRider.delete).toHaveBeenCalledWith({ where: { id: riderId } });
    });
});
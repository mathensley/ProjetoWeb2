import { PrismaClient } from "@prisma/client";
import { BcryptUtil } from '../../utils/BCryptUtils';
import { UpdateClientService } from "../../service/client/UpdateClientService";

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                client: {
                    create: jest.fn(),
                      delete: jest.fn(),
                      findUnique: jest.fn(),
                      findMany: jest.fn(),
                      update: jest.fn(),
                },
            };
        }),
    };
});

jest.mock('../../utils/BCryptUtils', () => {
    return {
        BcryptUtil: {
            hashPassword: jest.fn(),
            comparePassword: jest.fn().mockResolvedValue(false),
        },
    };
});

describe("UpdateClientService", () => {
    let prismaMock: PrismaClient;
    let updateClientService: UpdateClientService;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        updateClientService = new UpdateClientService(prismaMock);
    });

    it("deve atualizar os dados de um cliente com sucesso", async () => {
        const existingClient = {
            id: "uuid-123",
            name: "Cliente Antigo",
            email: "old_email@example.com",
        };

        const updatedClientData = {
            name: "Cliente Novo",
            email: "new_email@example.com",
        };

        const updatedClient = {
            ...existingClient,
            ...updatedClientData,
        };

        prismaMock.client.findUnique = jest.fn().mockResolvedValue(existingClient);
        prismaMock.client.update = jest.fn().mockResolvedValue(updatedClient);

        const result = await updateClientService.update(existingClient.id, updatedClientData);

        expect(prismaMock.client.findUnique).toHaveBeenCalledWith({ where: { id: existingClient.id } });
        expect(prismaMock.client.update).toHaveBeenCalledWith({
            where: { id: existingClient.id },
            data: updatedClientData,
        });

        expect(result).toEqual(updatedClient);
    });

    it("deve atualizar a senha de um cliente corretamente", async () => {
        const hashedPassword = "hashed_new_password";
        (BcryptUtil.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
        (BcryptUtil.comparePassword as jest.Mock).mockResolvedValue(false);

        const existingClient = {
            id: "uuid-123",
            name: "Cliente Antigo",
            email: "old_email@example.com",
            password: "hashed_old_password",
        };

        const updatedClientData = {
            password: "new_password",
        };

        const updatedClient = {
            ...existingClient,
            password: hashedPassword,
        };

        prismaMock.client.findUnique = jest.fn().mockResolvedValue(existingClient);
        prismaMock.client.update = jest.fn().mockResolvedValue(updatedClient);

        const result = await updateClientService.update(existingClient.id, updatedClientData);

        expect(prismaMock.client.findUnique).toHaveBeenCalledWith({ where: { id: existingClient.id } });
        expect(BcryptUtil.comparePassword).toHaveBeenCalledWith("new_password", "hashed_old_password");
        expect(BcryptUtil.hashPassword).toHaveBeenCalledWith("new_password");
        expect(prismaMock.client.update).toHaveBeenCalledWith({
            where: { id: existingClient.id },
            data: { password: hashedPassword },
        });

        expect(result).toEqual(updatedClient);
    });

    it("deve lançar um erro ao tentar atualizar um cliente inexistente", async () => {
        prismaMock.client.update = jest.fn().mockRejectedValue(new Error("Client not found"));

        await expect(updateClientService.update("uuid-inexistente", { name: "Novo Nome" }))
            .rejects.toThrow("Client not found");
    });
    
    it("deve falhar ao tentar atualizar a senha para a mesma já cadastrada", async () => {
        (BcryptUtil.comparePassword as jest.Mock).mockResolvedValue(true);

        const existingClient = {
            id: "uuid-123",
            name: "Cliente Antigo",
            email: "old_email@example.com",
            password: "hashed_old_password",
        };

        const updatedClientData = {
            password: "old_password",
        };

        prismaMock.client.findUnique = jest.fn().mockResolvedValue(existingClient);

        await expect(updateClientService.update(existingClient.id, updatedClientData))
            .rejects.toThrow("New password must be different from the current password");

        expect(BcryptUtil.comparePassword).toHaveBeenCalledWith("old_password", "hashed_old_password");
        expect(prismaMock.client.update).not.toHaveBeenCalled();
    });
});



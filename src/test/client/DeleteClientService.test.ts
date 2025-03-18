import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BcryptUtil } from '../../main/utils/BCryptUtils';
import { CreateClientService } from '../../main/service/client/CreateClientService';
import { DeleteClientService } from '../../main/service/client/DeleteClientService';

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                client: {
                    create: jest.fn(),
                    delete: jest.fn(),
                },
            };
        }),
    };
});

jest.mock('../../main/utils/BCryptUtils', () => {
    return {
        BcryptUtil: {
            hashPassword: jest.fn(),
        },
    };
});

describe('DeleteClientService', () => {
    let createClientService: CreateClientService;
    let deleteClientService: DeleteClientService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        deleteClientService = new DeleteClientService(prismaMock);
        createClientService = new CreateClientService(prismaMock);
    });

    it('deve deletar um cliente com sucesso', async () => {
        const hashedPassword = 'hashedPassword123';
        (BcryptUtil.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const clientData = {
            name: 'Cliente Teste',
            username: 'client_teste',
            password: 'senha123',
            cpf: '12345678900',
            email: 'cliente@example.com',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000',
            establishmentId: '1'
        };
        const createdClient = { ...clientData, id: 'generated-uuid-123', password: hashedPassword };
        prismaMock.client.create = jest.fn().mockResolvedValue(createdClient);

        // Criando o cliente antes de deletar
        const newClient = await createClientService.create(clientData);
        expect(BcryptUtil.hashPassword).toHaveBeenCalledWith('senha123');
        expect(prismaMock.client.create).toHaveBeenCalledWith({
            data: { ...clientData, password: hashedPassword }
        });

        // Mock da deleção
        prismaMock.client.delete = jest.fn().mockResolvedValue(newClient);

        // Deletando o cliente criado
        await deleteClientService.delete(newClient.id);
        expect(prismaMock.client.delete).toHaveBeenCalledWith({ where: { id: newClient.id } });
    });

    it('deve lançar erro se o cliente não for encontrado', async () => {
        const error = new PrismaClientKnownRequestError('Client not found', {
            code: 'P2025',
            clientVersion: '',
        });
        prismaMock.client.delete = jest.fn().mockRejectedValue(error);

        await expect(deleteClientService.delete('uuid-999')).rejects.toThrow("Client not found");
    });

    it('deve lançar erro ao tentar deletar um cliente sem fornecer um ID', async () => {
        await expect(deleteClientService.delete('')).rejects.toThrow('Unknown error ocurred');
    });
});
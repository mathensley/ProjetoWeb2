import { PrismaClient } from '@prisma/client';
import { BcryptUtil } from '../../utils/BCryptUtils';
import { CreateClientService } from '../../service/client/CreateClientService';
import { GetClientByIdService } from '../../service/client/GetClientByIdService';
import { GetClientService } from '../../service/client/GetClientService';

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
        },
    };
});

describe('Client Services - Get Methods', () => {
    let prismaMock: PrismaClient;
    let createClientService: CreateClientService;
    let getClientService: GetClientService;
    let getClientByIdService: GetClientByIdService;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createClientService = new CreateClientService(prismaMock);
        getClientService = new GetClientService(prismaMock);
        getClientByIdService = new GetClientByIdService(prismaMock);
    });

    it('deve criar um cliente e depois buscar ele pelo ID', async () => {
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

        const createdClient = { ...clientData, id: 'generated-uuid-123', hashedPassword };
        prismaMock.client.create = jest.fn().mockResolvedValue(createdClient);

        const newClient = await createClientService.create(clientData);
        expect(BcryptUtil.hashPassword).toHaveBeenCalledWith('senha123');
        expect(prismaMock.client.create).toHaveBeenCalledWith({
            data: { ...clientData, password: hashedPassword }
        });

        prismaMock.client.findUnique = jest.fn().mockResolvedValue(newClient);

        const foundClient = await getClientByIdService.get(newClient.id);
        expect(prismaMock.client.findUnique).toHaveBeenCalledWith({ where: { id: newClient.id } });
        expect(foundClient).toEqual(newClient);
    });

    it('deve retornar erro ao buscar cliente inexistente pelo ID', async () => {
        prismaMock.client.findUnique = jest.fn().mockResolvedValue(null);

        await expect(getClientByIdService.get('uuid-inexistente')).rejects.toThrow('Client not found');
    });

    it('deve buscar todos os clientes cadastrados', async () => {
        const clients = [
            { id: 'uuid-1', name: 'Cliente 1' },
            { id: 'uuid-2', name: 'Cliente 2' }
        ];

        prismaMock.client.findMany = jest.fn().mockResolvedValue(clients);

        const result = await getClientService.getAll();
        expect(prismaMock.client.findMany).toHaveBeenCalled();
        expect(result).toEqual(clients);
    });

    it('deve retornar lista vazia se não houver clientes', async () => {
        prismaMock.client.findMany = jest.fn().mockResolvedValue([]);

        const result = await getClientService.getAll();
        expect(prismaMock.client.findMany).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});
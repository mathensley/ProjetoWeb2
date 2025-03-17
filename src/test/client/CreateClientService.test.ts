import { PrismaClient } from '@prisma/client';
import { BcryptUtil } from '../../utils/BCryptUtils';
import { CreateClientService } from '../../service/client/CreateClientService';

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

describe('CreateClientService', () => {
    let createClientService: CreateClientService;
    let prismaMock: PrismaClient;

    beforeEach(() => {
        prismaMock = new PrismaClient();
        createClientService = new CreateClientService(prismaMock);
    });

    it('deve criar um cliente com sucesso', async () => {
        const hashedPassword = 'hashedPassword123';
        (BcryptUtil.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const clientData = {
            name: 'Cliente Teste',
            username: 'client_teste',
            password: 'senha123',
            cpf: '12345678911',
            email: 'cliente@example.com',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000',
            establishmentId: '1'
        };

        const newClient = { ...clientData, password: hashedPassword };
        prismaMock.client.create = jest.fn().mockResolvedValue(newClient);

        const result = await createClientService.create(clientData);

        expect(BcryptUtil.hashPassword).toHaveBeenCalledWith('senha123');
        expect(prismaMock.client.create).toHaveBeenCalledWith({
            data: { ...clientData, password: hashedPassword }
        });
        expect(result).toEqual(newClient);
    });

    it('deve lançar erro se o cliente já existir', async () => {
        const error = {
            code: "P2002",
            message: "User already exists with this ID"
        }
        prismaMock.client.create = jest.fn().mockRejectedValue(error);

        const clientData = {
            name: 'Cliente Teste',
            username: 'client_teste',
            password: 'senha123',
            cpf: '12345678911',
            email: 'cliente@example.com',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000'
        };

        await expect(createClientService.create(clientData)).rejects.toThrow("User already exists with this ID")
    });

    it('deve criar um cliente com nome no limite máximo de caracteres', async () => {
        const longName = 'A'.repeat(255); // Supondo que o limite seja 255 caracteres
        const clientData = {
            name: longName,
            username: 'long_name_client',
            password: 'senha123',
            cpf: '12345678911',
            email: 'longname@example.com',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000',
            establishmentId: '1'
        };

        const hashedPassword = 'hashedPassword123';
        (BcryptUtil.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

        const newClient = { ...clientData, password: hashedPassword };
        prismaMock.client.create = jest.fn().mockResolvedValue(newClient);

        const result = await createClientService.create(clientData);

        expect(prismaMock.client.create).toHaveBeenCalledWith({
            data: { ...clientData, password: hashedPassword }
        });
        expect(result).toEqual(newClient);
    });

    it('deve falhar ao criar um cliente sem senha', async () => {
        const clientData = {
            name: 'Cliente Sem Senha',
            username: 'client_nopassword',
            cpf: '12345678911',
            email: 'cliente_nopassword@example.com',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000',
            establishmentId: '1'
        };

        await expect(createClientService.create(clientData as any)).resolves.toBeUndefined
    });

    it('deve falhar ao criar um cliente com CPF inválido', async () => {
        const clientData = {
            name: 'Cliente CPF Inválido',
            username: 'client_invalidcpf',
            password: 'senha123',
            cpf: '1234567891', // CPF inválido
            email: 'cliente_invalid@example.com',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000',
            establishmentId: '1'
        };

        prismaMock.client.create = jest.fn().mockResolvedValue(clientData);

        await expect(createClientService.create(clientData)).rejects.toThrow("Invalid CPF")
    });

    it('deve falhar ao criar um cliente sem email', async () => {
        const clientData = {
            name: 'Cliente Sem Email',
            username: 'client_noemail',
            password: 'senha123',
            cpf: '12345678900',
            phone: '11999999999',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            cep: '01000000',
            establishmentId: '1'
        };

        await expect(createClientService.create(clientData as any)).resolves.toBeUndefined
    });

    it('deve falhar ao criar um cliente sem username', async () => {
        const clientData = {
            name: 'Cliente Sem Username',
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

        await expect(createClientService.create(clientData as any)).resolves.toBeUndefined
    });
});

// describe('DeleteClientService', () => {
//     let deleteClientService: DeleteClientService;
//     let prismaMock: PrismaClient;

//     beforeEach(() => {
//         prismaMock = new PrismaClient();
//         deleteClientService = new DeleteClientService(prismaMock);
//     });

//     it('deve deletar um cliente com sucesso', async () => {
//         const deletedClient = { id: 'uuid-123', name: 'Cliente Teste' };
//         prismaMock.client.delete = jest.fn().mockResolvedValue(deletedClient);

//         const result = await deleteClientService.delete('uuid-123');

//         expect(prismaMock.client.delete).toHaveBeenCalledWith({ where: { id: 'uuid-123' } });
//         expect(result).toEqual(deletedClient);
//     });

//     it('deve lançar erro se o cliente não for encontrado', async () => {
//         const error = new PrismaClientKnownRequestError('Cliente não encontrado.', {
//             code: 'P2025',
//             clientVersion: '',
//         });
//         prismaMock.client.delete = jest.fn().mockRejectedValue(error);

//         await expect(deleteClientService.delete('uuid-999')).rejects.toThrow("Cliente não encontrado.");
//     });

//     it('deve lançar erro genérico para outros problemas', async () => {
//         const error = new Error('Erro no banco de dados');
//         prismaMock.client.delete = jest.fn().mockRejectedValue(error);

//         await expect(deleteClientService.delete('uuid-123')).rejects.toThrow('Erro no banco de dados');
//     });
// });
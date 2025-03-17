import { GetProductService } from "../service/products/GetProductService";
import { prismaClient } from "../database/PrismaClient";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          findMany: jest.fn(),
        },
      };
    }),
  };
});

describe("GetProductService", () => {
  let getProductService: GetProductService;
  let mockProducts: any[];

  beforeEach(() => {
    getProductService = new GetProductService(prismaClient);

    mockProducts = Array.from({ length: 20 }, (_, index) => ({
      id: `${index + 1}`,
      name: `Produto ${index + 1}`,
      description: `Descrição do Produto ${index + 1}`,
      image: `image${index + 1}.jpg`,
      category: "Categoria",
      price: (index + 1) * 10,
      promotion: index % 2 === 0,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar uma lista vazia quando não houver produtos cadastrados", async () => {
    prismaClient.product.findMany = jest.fn().mockResolvedValue([]);

    const products = await getProductService.get(1, 10);

    expect(products).toEqual([]);
    expect(prismaClient.product.findMany).toHaveBeenCalledWith({ skip: 0, take: 10 });
  });

  it("Deve retornar apenas alguns produtos quando `size` for menor que o total", async () => {
    prismaClient.product.findMany = jest.fn().mockResolvedValue(mockProducts.slice(0, 5));

    const products = await getProductService.get(1, 5);

    expect(products.length).toBe(5);
    expect(products).toEqual(mockProducts.slice(0, 5));
    expect(prismaClient.product.findMany).toHaveBeenCalledWith({ skip: 0, take: 5 });
  });

  it("Deve retornar uma página cheia quando houver produtos suficientes (`size = 10`)", async () => {
    prismaClient.product.findMany = jest.fn().mockResolvedValue(mockProducts.slice(0, 10));

    const products = await getProductService.get(1, 10);

    expect(products.length).toBe(10);
    expect(products).toEqual(mockProducts.slice(0, 10));
    expect(prismaClient.product.findMany).toHaveBeenCalledWith({ skip: 0, take: 10 });
  });

  it("Deve retornar a última página com menos produtos do que `size`", async () => {
    prismaClient.product.findMany = jest.fn().mockResolvedValue(mockProducts.slice(10, 15));

    const products = await getProductService.get(2, 10);

    expect(products.length).toBe(5);
    expect(products).toEqual(mockProducts.slice(10, 15));
    expect(prismaClient.product.findMany).toHaveBeenCalledWith({ skip: 10, take: 10 });
  });

  it("Deve retornar produtos corretos para `page = 3` e `size = 5`", async () => {
    prismaClient.product.findMany = jest.fn().mockResolvedValue(mockProducts.slice(10, 15));

    const products = await getProductService.get(3, 5);

    expect(products.length).toBe(5);
    expect(products).toEqual(mockProducts.slice(10, 15));
    expect(prismaClient.product.findMany).toHaveBeenCalledWith({ skip: 10, take: 5 });
  });

  it("Deve lançar erro quando `page` ou `size` for menor ou igual a zero", async () => {
    await expect(getProductService.get(0, 10)).rejects.toThrow(
      "Insira um valor maior que 0 para page e size"
    );
    await expect(getProductService.get(1, 0)).rejects.toThrow(
      "Insira um valor maior que 0 para page e size"
    );
  });

  it("Deve lançar erro inesperado corretamente", async () => {
    prismaClient.product.findMany = jest.fn().mockRejectedValue(new Error("Erro interno"));

    await expect(getProductService.get(1, 10)).rejects.toThrow("Erro interno");
  });
});

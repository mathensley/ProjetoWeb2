import { UpdateProductService } from "../service/products/UpdateProductService";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { errors_product_code } from "../utils/ErrorsCode";
import { prismaClient } from "../database/PrismaClient";
import { mock } from "node:test";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          update: jest.fn(),
        },
      };
    }),
  };
});

describe("UpdateProductService", () => {
  let updateProductService: UpdateProductService;
  let mockProduct: any;

  beforeEach(() => {
    updateProductService = new UpdateProductService(new PrismaClient());

    mockProduct = {
      id: "1",
      name: "Produto Atualizado",
      description: "Descrição atualizada",
      image: "image_updated.jpg",
      category: "Categoria Atualizada",
      price: new Decimal("200"),
      promotion: false,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve atualizar o nome do produto com sucesso", async () => {
    const updatedProduct = { ...mockProduct, name: "Novo Nome" };

    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);

    const result = await updateProductService.update(mockProduct.id, { name: "Novo Nome" });

    expect(result.name).toBe("Novo Nome");
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { name: "Novo Nome" },
    });
  });

  it("Deve falhar ao tentar definir um nome inválido (nulo ou menos de 3 caracteres)", async () => {
    const product_name = { name: ""};

    prismaClient.product.update = jest.fn().mockImplementation(() => {
      throw new Error(errors_product_code.INVALID_PRODUCT_NAME);
    });
        
    await expect(updateProductService.update(mockProduct.id, product_name)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_NAME
    );
    
  });

  it("Deve falhar ao tentar definir um preço inválido (menor ou igual a zero)", async () => {
    await expect(updateProductService.update(mockProduct.id, { price: new Decimal("0") })).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    );

    await expect(updateProductService.update(mockProduct.id, { price: new Decimal("-10") })).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    );
  });

  it("Deve falhar ao tentar atualizar um produto que não existe", async () => {
    updateProductService["prismaClient"].product.update = jest.fn().mockRejectedValue({
      code: "P2025",
    });

    await expect(updateProductService.update("999", { name: "Inexistente" })).rejects.toThrow(
      errors_product_code.INVALID_UNRECOGNIZED_ERROR
    );
  });

  it("Deve falhar ao tentar atualizar um produto duplicado", async () => {
    updateProductService["prismaClient"].product.update = jest.fn().mockRejectedValue({
      code: "P2002",
    });

    await expect(updateProductService.update(mockProduct.id, { name: "Duplicado" })).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_ALREADY_EXIST
    );
  });

  it("Deve lançar erro inesperado corretamente", async () => {
    updateProductService["prismaClient"].product.update = jest.fn().mockRejectedValue(new Error("Erro interno"));

    await expect(updateProductService.update(mockProduct.id, { name: "Erro" })).rejects.toThrow(
      errors_product_code.INVALID_UNRECOGNIZED_ERROR
    );
  });

  it("Deve atualizar a promoção de 'false' para 'true'", async () => {
    const updatedProduct = { ...mockProduct, promotion: true };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { promotion: true });
  
    expect(result.promotion).toBe(true);
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { promotion: true },
    });
  });
  
  it("Deve atualizar a promoção de 'true' para 'false'", async () => {
    const updatedProduct = { ...mockProduct, promotion: false };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { promotion: false });
  
    expect(result.promotion).toBe(false);
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { promotion: false },
    });
  });
  
  it("Deve atualizar a descrição do produto com sucesso", async () => {
    const updatedProduct = { ...mockProduct, description: "Nova descrição" };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { description: "Nova descrição" });
  
    expect(result.description).toBe("Nova descrição");
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { description: "Nova descrição" },
    });
  });
  
  it("Deve remover a descrição do produto", async () => {
    const updatedProduct = { ...mockProduct, description: null };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { description: null });
  
    expect(result.description).toBeNull();
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { description: null },
    });
  });
  
  it("Deve atualizar a imagem do produto com sucesso", async () => {
    const updatedProduct = { ...mockProduct, image: "nova_imagem.jpg" };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { image: "nova_imagem.jpg" });
  
    expect(result.image).toBe("nova_imagem.jpg");
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { image: "nova_imagem.jpg" },
    });
  });
  
  it("Deve remover a imagem do produto", async () => {
    const updatedProduct = { ...mockProduct, image: null };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { image: null });
  
    expect(result.image).toBeNull();
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { image: null },
    });
  });
  
  it("Deve atualizar o preço do produto com sucesso", async () => {
    const updatedProduct = { ...mockProduct, price: new Decimal("300") };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { price: new Decimal("300") });
  
    expect(result.price.toString()).toBe("300");
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { price: new Decimal("300") },
    });
  });

  it("Teste de Valor Limite: Deve atualizar o preço do produto próximo ao limite inferior com sucesso", async () => {
    const updatedProduct = { ...mockProduct, price: new Decimal("0.001") };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { price: new Decimal("0.001") });
  
    expect(result.price.toString()).toBe("0.001");
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { price: new Decimal("0.001") },
    });
  });

  it("Teste de Valor Limite: Deve atualizar o preço do produto igual a 1 com sucesso", async () => {
    const updatedProduct = { ...mockProduct, price: new Decimal("1") };
  
    updateProductService["prismaClient"].product.update = jest.fn().mockResolvedValue(updatedProduct);
  
    const result = await updateProductService.update(mockProduct.id, { price: new Decimal("1") });
  
    expect(result.price.toString()).toBe("1");
    expect(updateProductService["prismaClient"].product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { price: new Decimal("1") },
    });
  });
})
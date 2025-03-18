import { DeleteProductService } from "../../main/service/products/DeleteProductService";
import { prismaClient } from "../../main/database/PrismaClient";
import { errors_product_code } from "../../main/utils/ErrorsCode";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          delete: jest.fn()
        },
      };
    }),
  };
});

describe("DeleteProductService", () => {
  let deleteProductService: DeleteProductService;
  let productId: string;

  beforeEach(() => {
    deleteProductService = new DeleteProductService(prismaClient);
    productId = "123456";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve excluir um produto com sucesso", async () => {
    prismaClient.product.delete = jest.fn().mockResolvedValue({ id: productId });
    
    await expect(deleteProductService.delete(productId)).resolves.not.toThrow();
    expect(prismaClient.product.delete).toHaveBeenCalledWith({ where: { id: productId } });
  });

  it("Deve lançar um erro ao tentar excluir um produto inexistente", async () => {
    prismaClient.product.delete = jest.fn().mockRejectedValue({ code: "P2025" });

    await expect(deleteProductService.delete(productId)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_BY_ID
    );
    expect(prismaClient.product.delete).toHaveBeenCalledWith({ where: { id: productId } });
  });
});
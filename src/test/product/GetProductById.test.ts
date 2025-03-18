import { GetProductByIdService } from "../../main/service/products/GetProductByIdService";
import { prismaClient } from "../../main/database/PrismaClient";
import { errors_product_code } from "../../main/utils/ErrorsCode";
import { Decimal } from "@prisma/client/runtime/library";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          findUnique: jest.fn(),
        },
      };
    }),
  };
});

describe("GetProductByIdService", () => {
  let getProductByIdService: GetProductByIdService;
  let productData: any;

  beforeEach(() => {
    getProductByIdService = new GetProductByIdService(prismaClient);
    productData = {
        name: "Bolo de Chocolate",
        description: "Bolo de chocolate médio",
        image: "image",
        category: "BOLO",
        price: new Decimal(`${99}`),
        promotion: false,
      };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar um produto quando o ID for válido", async () => {
    prismaClient.product.findUnique = jest.fn().mockResolvedValue(productData);

    const product = await getProductByIdService.get(productData.id);

    expect(product).toEqual([productData]);
    expect(prismaClient.product.findUnique).toHaveBeenCalledWith({
      where: { id: productData.id },
    });
  });

  it("Deve lançar um erro quando o produto não for encontrado", async () => {
    prismaClient.product.findUnique = jest.fn().mockResolvedValue(null);

    await expect(getProductByIdService.get("999")).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_BY_ID
    );

    expect(prismaClient.product.findUnique).toHaveBeenCalledWith({
      where: { id: "999" },
    });
  });
});

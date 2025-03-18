import { Product } from "@prisma/client";
import { CreateProductService } from "../service/products/CreateProductService";
import { Decimal } from "@prisma/client/runtime/library";
import { prismaClient } from "../database/PrismaClient";
import { errors_product_code } from "../utils/ErrorsCode";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          create: jest.fn()
        },
      };
    }),
  };
});

describe("CreateProductService", () => {
  let createProductService: CreateProductService;
  let productData: any;

  beforeEach(() => {
    createProductService = new CreateProductService(prismaClient);
    productData = {
      name: "Bolo de Chocolate",
      description: "Bolo de chocolate médio",
      image: "image",
      category: "BOLO",
      price: new Decimal(`${99}`),
      promotion: false,
    };

    prismaClient.product.create = jest.fn().mockResolvedValue(productData);
    createProductService.create(productData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Quando criamos o produto com sucesso com valor um pocuo maior que 0", async () => {
    const newProduct: Product = { ...productData, name: "Bolo de Morango", price: 0.001 };
    prismaClient.product.create = jest.fn().mockResolvedValue(newProduct);
    const newProductResponse = await createProductService.create(newProduct);

    expect(newProductResponse.name).toEqual(newProduct.name);
    expect(newProductResponse.category).toEqual(newProduct.category);
    expect(newProductResponse.description).toEqual(newProduct.description);
    expect(newProductResponse.image).toEqual(newProduct.image);
    expect(newProductResponse.price).toEqual(newProduct.price);
  });

  it("Quando criamos o produto com sucesso com valor igual a 1", async () => {
    const newProduct: Product = { ...productData, name: "Bolo de Morango", price: 1 };
    prismaClient.product.create = jest.fn().mockResolvedValue(newProduct);
    const newProductResponse = await createProductService.create(newProduct);

    expect(newProductResponse.name).toEqual(newProduct.name);
    expect(newProductResponse.category).toEqual(newProduct.category);
    expect(newProductResponse.description).toEqual(newProduct.description);
    expect(newProductResponse.image).toEqual(newProduct.image);
    expect(newProductResponse.price).toEqual(newProduct.price);
  });

  it("Quando criamos o produto com sucesso com preço maior que 1", async () => {
    const newProduct: Product = { ...productData, name: "Bolo de Morango" };
    prismaClient.product.create = jest.fn().mockResolvedValue(newProduct);
    const newProductResponse = await createProductService.create(newProduct);

    expect(newProductResponse.name).toEqual(newProduct.name);
    expect(newProductResponse.category).toEqual(newProduct.category);
    expect(newProductResponse.description).toEqual(newProduct.description);
    expect(newProductResponse.image).toEqual(newProduct.image);
    expect(newProductResponse.price).toEqual(newProduct.price);
  });

  it("Quando criamos um produto com preço igual a 0", async () => {
    const invalidProductData = { ...productData, price: new Decimal(`${0}`) };
    
    await expect(createProductService.create(invalidProductData)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    )}
  );

  it("Quando criamos um produto com preço negativo", async () => {
    const invalidProductData = { ...productData, price: new Decimal(`${-1}`) };
    
    await expect(createProductService.create(invalidProductData)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    )}
  );

  it("Quando criamos um produto com preço limite negativo próximo a 0", async () => {
    const invalidProductData = { ...productData, price: new Decimal(`${-0.001}`) };
    
    await expect(createProductService.create(invalidProductData)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    )}
  );

  it("Quando criamos um produto com preço limite negativo igual a -1", async () => {
    const invalidProductData = { ...productData, price: new Decimal(`${-1}`) };
    
    await expect(createProductService.create(invalidProductData)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    )}
  );

  it("Quando criamos um produto com preço limite negativo menor que -1", async () => {
    const invalidProductData = { ...productData, price: new Decimal(`${-100}`) };
    
    await expect(createProductService.create(invalidProductData)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_PRICE
    )}
  );

  it("Quando criamos um produto com nome vazio", async () => {
    let invalidProductData_ = productData;
    invalidProductData_.name = ""; 
    
    await expect(createProductService.create(invalidProductData_)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_NAME
    )}
  );

  it("Quando criamos um produto com nome de tamanho igual a 1", async () => {
    let invalidProductData_ = productData;
    invalidProductData_.name = "a"; 
    
    await expect(createProductService.create(invalidProductData_)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_NAME
    )}
  );

  it("Quando criamos um produto com nome de tamanho ihual a 2", async () => {
    let invalidProductData_ = productData;
    invalidProductData_.name = "ab"; 
    
    await expect(createProductService.create(invalidProductData_)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_NAME
    )}
  );

  it("Quando criamos um produto com nome de tamanho igual a 3", async () => {
    let invalidProductData_ = productData;
    invalidProductData_.name = "pão"; 
    
    await expect(createProductService.create(invalidProductData_)).rejects.toThrow(
      errors_product_code.INVALID_PRODUCT_NAME
    )
  });

  it("Quando criamos um produto com nome de tamanho igual a 4", async () => {
    let invalidProductData_ = productData;
    invalidProductData_.name = "pães"; 
    
    const newProduct: any = await createProductService.create(invalidProductData_);
    expect(newProduct.name).toEqual(invalidProductData_.name);
    expect(newProduct.category).toEqual(invalidProductData_.category);
    expect(newProduct.description).toEqual(invalidProductData_.description);
    expect(newProduct.image).toEqual(invalidProductData_.image);
    expect(newProduct.price).toEqual(invalidProductData_.price);
  });

  it("Quando criamos um produto com nome de tamanho igual maior que o limite", async () => {
    let invalidProductData_ = productData;
    invalidProductData_.name = "Pão russo"; 
    
    const newProduct: any = await createProductService.create(invalidProductData_);
    expect(newProduct.name).toEqual(invalidProductData_.name);
    expect(newProduct.category).toEqual(invalidProductData_.category);
    expect(newProduct.description).toEqual(invalidProductData_.description);
    expect(newProduct.image).toEqual(invalidProductData_.image);
    expect(newProduct.price).toEqual(invalidProductData_.price);
  });
});

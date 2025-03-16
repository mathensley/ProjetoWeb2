import { PrismaClient } from '@prisma/client';
import { CreateProductService } from "../service/products/CreateProductService";

const assert = require("assert");

const createProductService = new CreateProductService()

describe('Exemplo de Teste', () => {
  it('Deve passar este teste', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
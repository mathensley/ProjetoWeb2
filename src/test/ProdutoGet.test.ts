import { describe, it } from "node:test";

const assert = require("assert");

describe('Exemplo de Teste', () => {
  it('Deve passar este teste', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
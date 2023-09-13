const assert = require("assert");
const PostGres = require("../src/db/strategies/postgres");
const ContextStrategy = require("../src/db/strategies/base/contextStrategy");

const MOCK_PRODUTO_CADASTRAR = {
  nome_produto: "Produto Teste",
  descricao: "Produto Teste",
  preco: 10.0,
  quantidade: 10.0,
  categoria: "Categoria Teste",
};

const context = new ContextStrategy(new PostGres());

describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  before(async () => {
    await context.connect();
  });

  it("Postgres SQL Connection", async function () {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it(" Create a new product", async function () {
    const result = await context.create(MOCK_PRODUTO_CADASTRAR);
    delete result.id_produto;
    assert.deepEqual(result, MOCK_PRODUTO_CADASTRAR); //the result should be equal to the mock
  });

  it(" Read Products", async function () {
    const [result] = await context.read(MOCK_PRODUTO_CADASTRAR);
    delete result.id_produto;
    assert.deepEqual(result, MOCK_PRODUTO_CADASTRAR);
  });

  it("Update Product", async function () {
    const [update] = await context.read({
      nome_produto: MOCK_PRODUTO_CADASTRAR.nome_produto,
    });
    const novoItem = {
      ...MOCK_PRODUTO_CADASTRAR,
      nome_produto: "Teste Atualizado",
    };

    console.log("update: ", update);

    const [result] = await context.update(update.id_produto, novoItem);

    assert.deepEqual(result, 1);
  });

  it("Delete Product", async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.id_produto);
    assert.deepEqual(result, 1);
  });
});

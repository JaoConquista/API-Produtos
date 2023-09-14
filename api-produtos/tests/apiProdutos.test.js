const assert = require("assert");
const api = require("../api");
let app = {};
const MOCK_PRODUTO_CADASTRAR = {
  nome_produto: "Produto POST",
  preco: 100,
  descricao: "Produto POST",
  quantidade: 10,
  categoria: "Categoria POST",
}

describe.only("Suíte de testes da API de Produtos", function () {
  before(async () => {
    app = await api;
  });

  it("listar /produtos", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/produtos",
    });

    const statusCode = result.statusCode;
    console.log("status", statusCode)
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  // it('Listar Limit /produtos .', async () => {
  //     const TAMANHO_LIMITE = 3;
  //     const result = await app.inject({
  //         method: 'GET',
  //         url: `/produtos?skip=0&limit=${TAMANHO_LIMITE}`
  //     })

  //     const statusCode = result.statusCode;
  //     const dados = JSON.parse(result.payload)
  //     console.log('dados', dados.length)
  //     assert.deepEqual(statusCode, 200);
  //     assert.ok(dados.length === TAMANHO_LIMITE);
  // })

  it("Cadastrar /produtos", async () => {

    const result = await app.inject({
      method: "POST",
      url: "/produtos",
      payload: JSON.stringify(MOCK_PRODUTO_CADASTRAR),
    });

    const statusCode = result.statusCode;
    console.log("result.payload", result.payload)
    const { message } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.deepEqual(message, "Produto cadastrado com sucesso");
  });
 
});

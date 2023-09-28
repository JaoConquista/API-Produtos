const PostGres = require('./src/db/strategies/postgres')
const ContextStrategy = require('./src/db/strategies/base/contextStrategy')

const contextPostgres = new ContextStrategy(new PostGres());

const MOCK_PRODUTO_CADASTRAR = {
    nome_produto: 'Produto Teste',
    descricao: 'Produto Teste',
    preco: 10,
    quantidade: 10,
    categoria: 'Categoria Teste'
}

console.log('result: ', contextPostgres.create(MOCK_PRODUTO_CADASTRAR))
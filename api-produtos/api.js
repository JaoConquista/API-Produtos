const Hapi = require('hapi');
const Context = require('./src/db/strategies/base/contextStrategy');
const PostGres = require('./src/db/strategies/postgres');
const ProdutoRoutes = require('./src/routes/produtoRoutes')

const app = new Hapi.Server({
    port: 4000
});

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}

async function main() {
    const context = new Context(new PostGres());
    const produtoRoute = new ProdutoRoutes(context);
    await context.connect();

    app.route([{
        path: '/produtos',
        method: 'GET',
        handler: (request, headers) => {
            return context.read();
        }
    },
    {
        path: '/produtos',
        method: 'POST',
        handler: async (request) => {
            try {
                const {
                    nome_produto,
                    preco,
                    descricao,
                    quantidade,
                    categoria
                } = request.payload
                const result = await context.create({
                    nome_produto,
                    preco,
                    descricao,
                    quantidade,
                    categoria})
                return {
                    message: 'Produto cadastrado com sucesso',
                    _id: result._id
                }
            } catch (error) {
                console.log('DEU RUIM', error)
                return 'Erro interno no servidor'
            }
        }
          
    }])

    app.start();
    console.log('Servidor rodando na porta', app.info.port);

    return app;
}

module.exports = main();
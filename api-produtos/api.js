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
    await context.connect();

    app.route({
        path: '/produtos',
        method: 'GET',
        handler: (request, headers) => {
            return context.read();
        }
    },
    {
        path: '/produtos',
        method: 'POST',
        handler: (request, headers) => {
            return context.read();
        }
    })

    app.start();
    console.log('Servidor rodando na porta', app.info.port);

    return app;
}

module.exports = main();
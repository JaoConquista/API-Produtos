const Hapi = require('hapi');
const Context = require('./src/db/strategies/base/contextStrategy');
const PostGres = require('./src/db/strategies/postgres');

const app = new Hapi.Server({
    port: 4000
});

async function main() {
    const context = new Context(new PostGres());
    context.connect();

    app.route({
        path: '/produtos',
        method: 'GET',
        handler: (request, headers) => {
            return context.read();
        }
    })

    app.start();
    console.log('Servidor rodando na porta', app.info.port);
}

main();

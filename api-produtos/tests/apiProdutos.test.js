const assert = require('assert');
const api = require('../api');
let app = {};

describe.only('Suite de testes da API de Produtos', function () {
    before(async () => {
        // Inicialize o servidor Hapi.js e atribua-o à variável 'app'
        app = await api;
    });

    it('listar /produtos', async () => {
        // Verifique se 'app' está definido corretamente antes de usar o método 'inject'

        const result = await app.inject({
            method: 'GET',
            url: '/produtos'
        });

        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(JSON.parse(result.payload)));
    });
});
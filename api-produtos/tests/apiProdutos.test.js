const assert = require('assert');
const api = require('../api');
let app = {};

describe('Suite de testes da API de Produtos', function () {
    before(async () => {
        app = await api;
    });

    it('listar /produtos', async () => {

        const result = await app.inject({
            method: 'GET',
            url: '/produtos'
        });

        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(JSON.parse(result.payload)));
    });
});
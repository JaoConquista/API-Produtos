const assert = require('assert');
const PostGres = require('../db/strategies/postgres')
const ContextStrategy = require('../db/strategies/base/contextStrategy')

const context = new ContextStrategy(new PostGres());

describe('Postgres Strategy', function () {
    this.timeout(Infinity);
    it('Postgres SQL Connection', async function (){
        
    })
})

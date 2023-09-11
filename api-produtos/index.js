const PostGres = require('./src/db/strategies/postgres')
const ContextStrategy = require('./src/db/strategies/base/contextStrategy')

const contextPostgres = new ContextStrategy(new PostGres());

contextPostgres.create();
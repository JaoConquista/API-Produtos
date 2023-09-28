import { fastify } from 'fastify'
import { getProducts } from './routes/getProducts'
import { postProduct } from './routes/postProduct';
import { Postgres } from './db/postgres';
import { searchProductById, searchProductByName } from './routes/searchProduct';
import { populateDB } from './routes/populateDB';

const app = fastify();
const postgres = new Postgres();

const startServer = async () => {
    postgres.isConnected()
    console.log("Conectado ? : ", postgres.isConnected())

    app.register(getProducts, postgres)
    app.register(postProduct, postgres)
    app.register(searchProductById, postgres)
    app.register(searchProductByName, postgres)

    app.listen({
        port: 3333
    }).then(async () => {
        console.log("Server is runnig ...")
        
        // await populateDB(postgres);
    })
}

startServer();


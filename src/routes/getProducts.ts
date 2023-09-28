import { FastifyInstance } from "fastify"
import { Postgres } from "../db/postgres";

export async function getProducts(app: FastifyInstance, db: Postgres ) {
    app.get("/produtos", async () => {
        try {
            const produtos = await db.readAll(100)
            console.log('Get is alive')
            return {
                succes: true,
                data: produtos
            };
        } catch (error) {
            console.error(error)
            return {
                success: false,
                error: "An error occurred while fetching products."
            }
         }
    })
}
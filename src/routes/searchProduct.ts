import { FastifyInstance } from "fastify";
import { Postgres } from "../db/postgres";

interface Params {
    id: number
}

export async function searchProduct (app: FastifyInstance, db: Postgres){
    app.get("/produtos/:id", async (request, reply) => {
        const { id } = request.params as Params
        try {
            const produto = await db.readOne(id)
            console.log('Get is alive')
            return {
                succes: true,
                data: produto
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
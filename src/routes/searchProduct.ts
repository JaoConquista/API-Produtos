import { FastifyInstance } from "fastify";
import { Postgres } from "../db/postgres";
import { StringDataTypeConstructor } from "sequelize";

interface Params {
    id?: number;
    name?: string;
}

export async function searchProductById (app: FastifyInstance, db: Postgres){
    app.get("/produtos/:id", async (request, reply) => {
        const { id } = request.params as Params
        try {
            const produto = await db.readById(id)
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

export async function searchProductByName (app: FastifyInstance, db: Postgres){
    app.get("/produtos/name/:name", async (request, reply) => {
        const { name } = request.params as Params
        try {
            const produto = await db.readByName(name)
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
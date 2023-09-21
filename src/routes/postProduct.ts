import { FastifyInstance } from "fastify";
import { Postgres } from "../db/postgres";

export async function postProduct(app: FastifyInstance, db: Postgres) {

    app.post("/produtos", async (req, reply) => {
        try {
            const data = req.body;
            console.log('Post is alive')

            const create = await db.create(data);
            return {
                succes: true,
                post: create
            }
        } catch (error) {
            console.log("Body :", req.body)
            console.error("Error creating product:", error);
            reply.status(500).send({
                success: false,
                message: "Error creating product",
                error: error,
            });
        }

    })
}
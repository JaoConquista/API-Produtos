import { Postgres } from "../db/postgres";
import { faker } from "@faker-js/faker"
import { FastifyInstance } from "fastify";

function generateRandomProduct(quantity: number) {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();
    const productPrice = faker.number.float({
      min: 1,
      max: 1000,
      precision: 0.01,
    });
    const productDescription = faker.lorem.sentence();
    const productQuantity = faker.number.int({ min: 1, max: 10000 });
    const productCategory = faker.commerce.department();

    const product = {
      nome_produto: productName,
      preco: productPrice,
      descricao: productDescription,
      quantidade: productQuantity,
      categoria: productCategory,
    };
    products.push(product);
  }

  return products;
}

export async function populateDB(db: Postgres) {
  try {
    const initialTime = Date.now();
    let createdElements = 0;

    const promises = [];

    for (let i = 0; i < 500; i++) {
      console.log("criando promise ", i);
      const promise = new Promise<void>(async (resolve) => {
        console.log("resolvendo promise ", i);
        const result = await db.bulkCreate(
          generateRandomProduct(2000)
        );

        if (result !== undefined) {
          createdElements += result.length;
          console.log("createdElements", createdElements);
          resolve();
        }

      });
      promises.push(promise);
    }

    await db.bulkCreate(promises)

    const spentTime = Date.now() - initialTime;
    console.log("finalizado em : ",spentTime)
  } catch (error) {
    console.error("erro: ", error)
    throw error
  }
}



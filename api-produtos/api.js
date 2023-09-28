const Hapi = require("hapi");
const Context = require("./src/db/strategies/base/contextStrategy");
const PostGres = require("./src/db/strategies/postgres");
const ProdutoRoutes = require("./src/routes/produtoRoutes");
const { faker } = require("@faker-js/faker");

const app = new Hapi.Server({
  port: 4000,
});

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

function generateRandomProduct(quantity) {
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

async function main() {
  const context = new Context(new PostGres());
  await context.connect();

  app.route([
    {
      path: "/produtos",
      method: "GET",
      handler: async (request, headers) => {
        console.log("rodou");
        try {
          const initialTime = Date.now();
          let createdElements = 0;

          const promises = [];

          for (let i = 0; i < 1000; i++) {
            console.log("criando promise ", i);
            const promise = new Promise(async (resolve) => {
              console.log("resolvendo promise ", i);
              const result = await context.bulkCreate(
                generateRandomProduct(2000)
              );

              createdElements += result.length;
              console.log("createdElements", createdElements);
              resolve();
            });
            promises.push(promise);
          }

          await Promise.all(promises);

          const spentTime = Date.now() - initialTime;

          return {
            message: `Tempo gasto ${spentTime}ms; ${createdElements} elementos criados`,
          };
        } catch (error) {
          console.log("DEU RUIM", error);
          return "Erro interno no servidor";
        }
      },
    },
    // {
    //   path: "/produtos",
    //   method: "POST",
    //   handler: async (request) => {
    //     try {
    //       const { nome_produto, preco, descricao, quantidade, categoria } =
    //         request.payload;
    //       const result = await context.create({
    //         nome_produto,
    //         preco,
    //         descricao,
    //         quantidade,
    //         categoria,
    //       });
    //       return {
    //         message: "Produto cadastrado com sucesso",
    //         _id: result._id,
    //       };
    //     } catch (error) {
    //       console.log("DEU RUIM", error);
    //       return "Erro interno no servidor";
    //     }
    //   },
    // },
    // {
    //   path: "/populate",
    //   method: "POST",
    //   handler: async (request, headers) => {
    //     console.log("rodou");
    //     try {
    //       const initialTime = Date.now();
    //       const createdElements = 0;

    //       // const result = await context.bulkCreate();

    //       await new Promise((resolve) => {
    //         setTimeout(() => {
    //           resolve();
    //         }, 1000);
    //       });

    //       const spentTime = Date.now() - initialTime;
    //       return {
    //         message: `Tempo gasto ${spentTime}ms; ${createdElements} elementos criados`,
    //       };
    //     } catch (error) {
    //       console.log("DEU RUIM", error);
    //       return "Erro interno no servidor";
    //     }
    //   },
    // },
  ]);

  app.start();
  console.log("Servidor rodando na porta", app.info.port);

  return app;
}

module.exports = main();

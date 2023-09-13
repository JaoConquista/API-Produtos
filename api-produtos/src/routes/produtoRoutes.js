const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const failAction = (request, headers, erro) => {
  throw erro;
};
class ProdutoRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/produtos",
      method: "GET",
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;

          let query = {};

          if (nome) {
            query.nome = nome;
          }

          if (isNaN(skip)) {
            throw Error("O tipo do skip é incorreto");
          }
          if (isNaN(limit)) {
            throw Error("O tipo do limite é incorreto");
          }

          return this.db.read({ nome: nome }, parseInt(skip), parseInt(limit));
        } catch (error) {
          console.log("DEU RUIM", error);
          return "Erro interno no servidor";
        }
      },
    };
  }

  create() {
    return {
        path: "/produtos",
        method: "POST",
        config: {
        validate: {
          failAction,
          payload: {
            nome_produto: Joi.string().max(100).required(),
            preco: Joi.number().required(),
            descricao: Joi.string().max(100).required(),
            quantidade: Joi.number().required(),
            categoria: Joi.string().max(100).required(),
          },
          },
            },
        handler: async (request) => {
            try {
                const {
                    nome_produto,
                    preco,
                    descricao,
                    quantidade,
                    categoria, 
                } = request.payload
                const result = await this.db.create({
                    nome_produto,
                    preco,
                    descricao,
                    quantidade,
                    categoria,
                })

                return {
                    message: 'Produto cadastrado com sucesso',
                    _id: result._id
                }
            } catch (error) {
                console.log('DEU RUIM', error)
                return 'Erro interno no servidor'
            }
        }
      }
    }
  }


module.exports = ProdutoRoutes;

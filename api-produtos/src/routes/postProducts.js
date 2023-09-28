const Joi = require("joi");
const failAction = (request, headers, erro) => {
  throw erro;
};
export async function post() {
    return {
        path: "/produtos",
        method: "POST",
        config: {
        validate: {
          failAction,
          payload: {
            nome_produto: Joi.string().min(2).max(100).required(),
            preco: Joi.number().required(),
            descricao: Joi.string().min(2).max(100).required(),
            quantidade: Joi.number().required(),
            categoria: Joi.string().min(2).max(100).required(),
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

                console.log('result', result)

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
const Sequelize = require("sequelize");
const drive = new Sequelize(
  "produtos", //database
  "JoaoConquistaDev", //user
  "123456", //password
  {
    host: "localhost", // onde está hospedado
    dialect: "postgres", //drive type
    //case sentive
    quoteIdentifiers: false,
    //deprecation warining
    operatorsAliases: false,
    // dialectOptions: {
    //     ssl: false,
    // }
  }
);

async function main() {
  const Produtos = drive.define("produtos", {
    id_produto: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_produto: {
      type: Sequelize.STRING,
      required: true,
    },
    descricao: {
      type: Sequelize.STRING,
      required: true,
    },
    preco: {
      type: Sequelize.DOUBLE,
      required: true,
    },
    quantidade: {
      type: Sequelize.INTEGER,
      required: true,
    },
    categoria: {
        type: Sequelize.STRING,
        required: true,
    }
  },{
    tableName: 'TB_PRODUTOS',
    freezeTableName: false,//não alterar o nome da tabela
    timestamps: false//não criar colunas de controle de data
  });

  await Produtos.sync();//sincroniza com o banco de dados

//   await Produtos.create({//cria um registro
//     nome_produto: "Notebook",
//     descricao: "Notebook Dell",
//     preco: 3000,
//     quantidade: 10,
//     categoria: "Informática",
//   })

  const result = await Produtos.findAll({
    raw: true,//retorna apenas os dados
    attributes: ['nome_produto']
  })//retorna todos os registros
  console.log('result: ',result)
}

main();

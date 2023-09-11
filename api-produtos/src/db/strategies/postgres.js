const ICrud = require("./interface/interfaceCrud");
const Sequelize = require("sequelize");

class PostGres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._produtos = null;
    this._connect();
  }
  async isConnected(){
    try {
        this._driver.authenticate()
        return true;
    } catch (error) {
        console.log('Erroouu: ', error)
    }
  }

  async _defineModel() {
    this._produtos = drive.define("produtos", {
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
    
      await Produtos.sync();
  }

  _connect() {
    this._driver = new Sequelize(
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
  }

  create(item) {
    console.log("O produto foi salvo em PostGres");
  }
}

module.exports = PostGres;

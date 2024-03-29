const ICrud = require("./interface/interfaceCrud");
const Sequelize = require("sequelize");

// bulkCreate
class PostGres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._produtos = null;
  }

  async isConnected() {
    try {
      this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("Erroouu: ", error);
    }
  }

  async _defineModel() {
    this._produtos = this._driver.define(
      "produtos",
      {
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
        },
      },
      {
        tableName: "TB_PRODUTOS",
        freezeTableName: false, //não alterar o nome da tabela
        timestamps: false, //não criar colunas de controle de data
      }
    );

    await this._produtos.sync();
  }

  async connect() {
    this._driver = new Sequelize(
      process.env.PRODUCTS_TABLE || "produtos", //table
      process.env.POSTGRES_USER || "dev", //user
      process.env.POSTGRES_PASSWORD || "dev", //password
      {
        host: "localhost", // onde está hospedado
        dialect: "postgres", //drive type
        //case sentive
        quoteIdentifiers: false,
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
    await this._defineModel();
  }

  async create(item) {
    const { dataValues } = await this._produtos.create(item);

    return dataValues;
  }

  async read(item) {
    return this._produtos.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    const r = await this._produtos.update(item, { where: { id_produto: id } });
    return r;
  }

  async delete(id) {
    const query = id ? { id_produto: id } : {};
    return this._produtos.destroy({ where: query });
  }

  async bulkCreate(items) {
    const values = await this._produtos.bulkCreate(items, { returning: true });

    return values;
  }
}

module.exports = PostGres;

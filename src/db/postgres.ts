import { DataTypes, Sequelize } from "sequelize";
import { IProduct } from "../dtos/ProductDTO";
import { Op } from "sequelize";

export class Postgres {
    private _driver: Sequelize | null;
    private _produtos;

    constructor() {
        this._driver = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            username: 'dev',
            password:  'dev',
            database: 'produtos',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 240000,
                idle: 10000,
            },
        });

        this._produtos = this._defineModel();
    }

    async isConnected() {
        try {
            this._driver?.authenticate();
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    private _defineModel() {
        return this._driver?.define('produtos', {
            id_produto: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome_produto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            preco: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: 'tb_produtos',
            freezeTableName: false,
            timestamps: false,
        });
    }

    async readAll(limit?: number) {
        try {
            let results
            limit ?   results = await this._produtos?.findAll({ limit: limit }) :  results = await this._produtos?.findAll();
            return results
        } catch (error) {
            console.error("Erro ao ler items: ", error)
            throw error;
        }
    }

    async readById(id: number){
        try {

            const response = await this._produtos?.findOne({where: {id_produto: id}})
            return response;

        }catch (error) {
            console.error("Erro ao ler item: ", error)
            throw error;
        }
    }

    async readByName(name: string){
        try {
            const response = await this._produtos?.findOne({where: {nome_produto: name}})
            return response;
        } catch (error) {
            console.error("Erro ao ler item: ", error)
            throw error;
        }
    }

    async create(item: IProduct){
        try {
            const create = await this._produtos?.create(item)
            return create?.toJSON()
        } catch (error) {
            console.error("Erro: ", error)
            throw error;
        }
    }
    
    async bulkCreate(items: IProduct[]) {
        const values = await this._produtos?.bulkCreate(items, { returning: true });
    
        return values;
    }
}
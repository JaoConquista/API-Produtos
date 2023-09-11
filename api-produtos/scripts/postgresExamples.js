const Sequelize = require('sequelize');
const drive = new Sequelize(
    'produtos',//database
    'JoaoConquistaDev',//user
    '123456',//password
    {
        host: 'localhost',// onde está hospedado
        dialect: 'postgres',//drive type
        //case sentive
        quoteIdentifiers: false,
        //deprecation warining
        operatorsAliases: false,
        // dialectOptions: {
        //     ssl: false,
        // }
    }
)

async function main (){
    
}

main()
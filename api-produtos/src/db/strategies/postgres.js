const ICrud = require('./interface/interfaceCrud');

class PostGres extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O produto foi salvo em PostGres');    
    }  
}

module.exports = PostGres;
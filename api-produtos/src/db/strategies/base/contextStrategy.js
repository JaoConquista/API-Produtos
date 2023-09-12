const ICrud = require('../interface/interfaceCrud');

class ContextStrategy extends ICrud {
    constructor(database) {
        super()
        this._database = database
    }

    create(item){
        return this._database.create(item)
    }

    read (item){
        return this._database.read(item)
    }

    delete (item) {
        return this._database.delete(item)
    }

    update (id) {
        return this._database.update(id);
    }

    isConnected(){
        return this._database.isConnected()
    }

    connect(){
         return this._database.connect();
    }
}

module.exports = ContextStrategy;
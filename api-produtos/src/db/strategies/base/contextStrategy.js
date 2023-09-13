const ICrud = require('../interface/interfaceCrud');

class ContextStrategy extends ICrud {
    constructor(database) {
        super()
        this._database = database
    }

    create(item){
        return this._database.create(item)
    }

    read (item, skip, limit){
        return this._database.read(item, skip, limit)
    }

    delete (item) {
        return this._database.delete(item)
    }

    update (id, item) {
        return this._database.update(id, item);
    }

    isConnected(){
        return this._database.isConnected()
    }

    connect(){
         return this._database.connect();
    }
}

module.exports = ContextStrategy;
const ICrud = require("../interface/interfaceCrud");

class ContextStrategy extends ICrud {
  constructor(database) {
    super();
    this._database = database;
  }

  create(item) {
    const r = this._database.create(item);
    return r;
  }

  read(item, skip, limit) {
    return this._database.read(item, skip, limit);
  }

  delete(item) {
    return this._database.delete(item);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  isConnected() {
    return this._database.isConnected();
  }
  connect() {
    return this._database.connect();
  }
  bulkCreate(items) {
    return this._database.bulkCreate(items);
  }
}

module.exports = ContextStrategy;

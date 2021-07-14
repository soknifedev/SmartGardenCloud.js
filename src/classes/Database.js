import { Sequelize } from 'sequelize';
import assert from 'assert';
import { db } from '../../config';
import initModels from '../models/v1/init-models';

export default {

  get instance() {
    return this.sequelize;
  },

  get models() {
    return this.sequelizeModels;
  },

  async connect() {
    const sequelize = new Sequelize(db.name, db.user, db.password, {
      host:    db.host,
      dialect: db.dialect,
      pool:    db?.pool,
      logging: false
    });

    try {
      await sequelize.authenticate();
    } catch (error) {
      assert(!error, `Could not connect to database: ${error?.message}`);
    }

    this.sequelize = sequelize;
    sequelize.sync({
      // force: true
    });
    this.sequelizeModels = initModels(this.sequelize);
    return this.sequelize;
  },

  disconnect() {
    return this.sequelize.close();
  }
};

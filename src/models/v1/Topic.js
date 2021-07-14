import _sequelize from 'sequelize';

const { Model } = _sequelize;

export default class Topic extends Model {

  static findOneByName = async function(name) {
    return this.findOne({ where: { name } });
  };

  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: false,
        type:          DataTypes.BIGINT,
        allowNull:     false,
        primaryKey:    true
      },
      name: {
        type:      DataTypes.TEXT,
        allowNull: false
      },
      generatedAt: {
        type:      DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      tableName:  'topics',
      timestamps: true,
      indexes:    [
        {
          name:   'PRIMARY',
          unique: true,
          using:  'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    });
    return Topic;
  }
}

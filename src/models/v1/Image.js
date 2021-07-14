import _sequelize from 'sequelize';

const { Model } = _sequelize;

export default class Image extends Model {

  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type:          DataTypes.BIGINT,
        allowNull:     false,
        primaryKey:    true
      },
      topic_id: {
        type:      DataTypes.BIGINT,
        allowNull: false
      },
      checksum: {
        type:      DataTypes.STRING(32),
        allowNull: false,
        unique:    'checksum'
      },
      file: {
        type:      DataTypes.TEXT,
        allowNull: false
      },
      generatedAt: {
        type:      DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      tableName:  'images',
      timestamps: true,
      indexes:    [
        {
          name:   'PRIMARY',
          unique: true,
          using:  'BTREE',
          fields: [
            { name: 'id' }
          ]
        },
        {
          name:   'checksum',
          unique: true,
          using:  'BTREE',
          fields: [
            { name: 'checksum' }
          ]
        }
      ]
    });
    return Image;
  }
}

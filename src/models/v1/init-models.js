import Image from  './Image.js';
import SensorData from  './SensorData.js';
import Topic from  './Topic.js';
import _sequelize from 'sequelize';

const { DataTypes } = _sequelize;

export default function initModels(sequelize) {
  const image = Image.init(sequelize, DataTypes);
  const topic = Topic.init(sequelize, DataTypes);
  const sensorData = SensorData.init(sequelize, DataTypes);

  image.belongsTo(topic, { as: 'topic', foreignKey: 'topic_id' });
  topic.hasMany(image, { as: 'images', foreignKey: 'topic_id' });
  sensorData.belongsTo(topic, { as: 'topic', foreignKey: 'topic_id' });
  topic.hasMany(sensorData, { as: 'sensors_data', foreignKey: 'topic_id' });

  return {
    Image:      image,
    Topic:      topic,
    SensorData: sensorData
  };
}

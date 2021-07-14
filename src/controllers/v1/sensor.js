import Database from '../../classes/Database';
import assert from 'http-assert';

const { SensorData } = Database.models;

export const create = async (ctx) => {
  const { body } = ctx.request;
  const {
    // eslint-disable-next-line camelcase
    topic_id, checksum, data,
    createdAt
  } = body;

  const [sensorData] = await SensorData.findOrCreate({
    where:    { checksum, topic_id },
    defaults: {
      topic_id,
      checksum,
      data,
      generatedAt: createdAt
    }
  });

  ctx.success({
    message: 'ok',
    data:    sensorData
  });

};

export const fetchAll = async (ctx) => {

  const items = await SensorData.findAll();

  ctx.success({
    message: 'ok',
    data:    items
  });

};


export const fetchById = async (ctx) => {
  const { id } = ctx.params;

  const item = await SensorData.findOne({
    where: {
      id
    }
  });

  assert(item, 400, 'No se encontró el elemento');

  ctx.success({
    message: 'ok',
    data:    item
  });

};

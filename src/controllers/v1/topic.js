import Database from '../../classes/Database';
import assert from 'http-assert';

const { Topic } = Database.models;

export const create = async (ctx) => {
  const { body } = ctx.request;
  const { name, createdAt, id } = body;

  const [topic] = await Topic.findOrCreate({
    where:    { name },
    defaults: {
      id,
      name,
      generatedAt: createdAt
    }
  });

  ctx.success({
    message: 'ok',
    data:    topic
  });

};

export const fetchAll = async (ctx) => {

  const items = await Topic.findAll();

  ctx.success({
    message: 'ok',
    data:    items
  });

};


export const fetchById = async (ctx) => {
  const { id } = ctx.params;

  const item = await Topic.findOne({
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

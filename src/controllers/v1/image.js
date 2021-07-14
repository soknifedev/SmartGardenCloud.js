import Database from '../../classes/Database';
import assert from 'http-assert';

const { Image } = Database.models;

export const create = async (ctx) => {
  const { body } = ctx.request;
  const imageFile = ctx.request.file;

  const {
    // eslint-disable-next-line camelcase
    topic_id, checksum,
    createdAt
  } = body;

  if (!imageFile) {
    ctx.error('no image found!');
  }

  const [image] = await Image.findOrCreate({
    where:    { checksum, topic_id },
    defaults: {
      topic_id,
      checksum,
      file:        imageFile.originalname,
      generatedAt: createdAt
    }
  });

  ctx.success({
    message: 'ok',
    data:    image
  });


};

export const fetchAll = async (ctx) => {

  const items = await Image.findAll();

  ctx.success({
    message: 'ok',
    data:    items
  });

};


export const fetchById = async (ctx) => {
  const { id } = ctx.params;

  const item = await Image.findOne({
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

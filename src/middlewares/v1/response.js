import config from '../../../config';

const error = (err, statusCode) => {
  if (!/development|dev/iu.test(config.mode)) {
    if (err?._message) {
      err.message = err._message;
    }
  }

  const e = new Error(err);

  if (statusCode) {
    e.code = statusCode;
  }

  throw e;
};

const success = (ctx, result, statusCode) => {

  const obj = { };

  if (result?.message) {
    obj.message = result.message;
    delete result.message;
  }

  if (result.data) {
    obj.data = result.data;
  } else if (Object.keys(result).length !== 0) {
    obj.data = result;
  }

  if (statusCode) {
    ctx.status = statusCode;
  }

  ctx.body = obj;
};

export default async (ctx, next) => {
  ctx.error     = (err, statusCode)                   => error  (err, statusCode);
  ctx.success   = (result, statusCode)                => success(ctx, result, statusCode);
  await next();
};

import config from '../../../config';

const error = (ctx, err) => {
  console.error(err);

  const obj = { };

  if (err) {
    obj.error = {
      code: err?.code
    };

    if (typeof err === 'string') {
      obj.error.message = err;
    } else {
      obj.error.message = err?.message;
    }
  }

  if (err?.errors) {
    const errors = err.errors.map((item) => item?.message);

    obj.error.message = errors.join('; ');
  }

  if (config.mode === 'dev') {
    obj.stackTrace = err.stack;
    obj.request = {
      headers: ctx.request.headers
    };
  }

  ctx.type = 'json';
  ctx.status = err.statusCode || 500;
  ctx.body = obj;
};

export default async (ctx, next) => {
  try {
    await next();

    if (ctx.status === 404) {
      if (ctx.response.message === 'Not Found') {
        error(ctx, `Some of the aliases you requested do not exist ${ctx.request.method} ${ctx.request.path}`);
      } else {
        error(ctx, ctx?.response?.message);
      }
    }
  } catch (err) {
    error(ctx, err);
  }
};

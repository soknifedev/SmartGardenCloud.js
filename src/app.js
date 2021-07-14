import Koa from 'koa';
import assert from './middlewares/v1/assert';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import cors from '@koa/cors';
import router from './routes';

const app = new Koa();

app.proxy = true;

app.use(cors());
app.use(compress());
app.use(assert);
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  formLimit:   '100mb',
  jsonLimit:   '100mb',
  textLimit:   '100mb'
}));

app.use(router.routes());


export default app;

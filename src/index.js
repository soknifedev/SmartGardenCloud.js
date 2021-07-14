import   Database     from './classes/Database';
import   assert       from 'assert';
import   config       from '../config';

if (config.mode === 'dev') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const bootstrap = async () => {
  await Database.connect();

  assert(config?.api?.port, 'Please specify a port to listen on for the RESTFul API in the config.json file');

  const app = (await import('./app')).default;

  app.listen(config.api?.port, config.api?.bind);
};

bootstrap()
  .then  (()  => console.log(`Listening on port ${config.api.bind ? `${config.api.bind}:` : ''}${config.api.port}`))
  .catch ((err) => console.error(err));

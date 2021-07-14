import FileHound from 'filehound';
import Router     from 'koa-router';
import assert     from 'assert';
import async from 'async';
import fs from 'fs';

const loader = async (version) => {
  const router = new Router();

  router.version = parseInt(version, 10);
  router.versionPath = `${__dirname}/v${router.version}`;
  assert(router.version, 'Version must be specified before autoloading routes.');
  assert(fs.existsSync(router.versionPath), `Could not find routes for version ${router.version} in ${router.versionPath}`);

  const routesFiles = FileHound.create()
    .paths(router.versionPath)
    .ext('.js')
    .findSync();


  await async.each(routesFiles, async (file) => {
    const route   = (await import(file))?.default;

    if (route !== undefined) {
      router.use(`/v${router.version}`, route.routes());
      console.debug('loaded routes form path', route.opts.prefix);
    }
  });

  return router;
};

export default loader;

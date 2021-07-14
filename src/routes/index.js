import Router     from 'koa-router';
import requireDir from 'require-dir';

const router = new Router();

router.fallbackVersion = 1;

const versionDirectories = requireDir('./',
  {
    recurse:    true,
    extensions: ['.js'],
    filter:     (fullPath) => /v[0-9]+$/.test(fullPath)
  });

const versions = Object.keys(versionDirectories);

versions.forEach(async (version) => {
  const versionMatch = version.match(/^v([0-9]+)$/);

  if (versionMatch) {
    const apiVersion = parseInt(versionMatch[1], 10);

    import('./autoloader.js').then(async (autoloaderJS) => {

      const autoloaderRouter   = await autoloaderJS.default(apiVersion);
      const assertMiddleware   = (await import(`../middlewares/v${apiVersion}/assert`)).default;
      const responseMiddleware = (await import(`../middlewares/v${apiVersion}/response`)).default;
      const routePath = `/v${apiVersion}`;

      router.use(routePath, responseMiddleware);
      router.use(routePath, autoloaderRouter.routes());

      if (apiVersion === router.fallbackVersion) {
        router.use(responseMiddleware);
        router.use(autoloaderRouter.routes());
        router.use(assertMiddleware);
      }
      router.use(routePath, assertMiddleware);
    });

  } else {
    console.error('Could not find any route for API version "', version, '"');
  }
});

export default router;

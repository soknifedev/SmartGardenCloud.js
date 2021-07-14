import * as controller from '../../controllers/v1/topic';
import Router from 'koa-router';

const options = {
  prefix: '/topics'
};

const router = new Router(options);

router.post('/', controller.create);
router.get('/', controller.fetchAll);
router.get('/:id', controller.fetchById);

export default router;

import * as controller from '../../controllers/v1/sensor';
import Router from 'koa-router';

const options = {
  prefix: '/sensors'
};

const router = new Router(options);

router.post('/', controller.create);
router.get('/', controller.fetchAll);
router.get('/:id', controller.fetchById);

export default router;

import * as controller from '../../controllers/v1/image';
import Router from 'koa-router';
import multer from '@koa/multer';
import { storagePath } from '../../../config';

const options = {
  prefix: '/images'
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, storagePath.ambient.image);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const router = new Router(options);

router.post('/', upload.single('imageFile'), controller.create);
router.get('/', controller.fetchAll);
router.get('/:id', controller.fetchById);

export default router;

import express from 'express';
import { library } from '../../../controllers/v1/developer';

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// routes
// ------------------------------------

router.post('/media/:id/:tag', middleware.auth, library.uploadImage);
router.get('/:type/:library_name', middleware.auth, library.getSingle);
router.get('/:type/:cursor/:take/:order', middleware.auth, library.getMultiple);
router.post('/:type', middleware.auth, library.createSingle);
router.patch('/:id', middleware.auth, library.updateSingle);
router.patch(
    '/deactivate/:state/:id',
    middleware.auth,
    library.deactivateSingle,
);

export default router;

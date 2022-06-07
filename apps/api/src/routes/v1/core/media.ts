import express from 'express';
import { media } from '../../../controllers/v1/core';

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// routes
// ------------------------------------

router.get('/cdn/:key', middleware.cdnImageAuth, media.streamMedia);
router.get('/:id', middleware.auth, media.getSingle);
router.get('/:cursor/:take/:order', middleware.auth, media.getMultiple);
router.delete('/:id', middleware.auth, media.deleteSingle);
router.delete('/', middleware.auth, media.deleteMultiple);
router.patch('/:id', middleware.auth, media.updateSingle);
router.post('/:mode', middleware.auth, media.uploadSingle);

export default router;

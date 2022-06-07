import express from 'express';
import { media } from '../../../controllers/v1/core';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

// ------------------------------------
// routes
// ------------------------------------

router.get('/:id', middleware.auth, media.getSingle);
router.get('/:cursor/:take/:order', middleware.auth, media.getMultiple);
router.delete('/:id', middleware.auth, media.deleteSingle);
router.delete('/', middleware.auth, media.deleteMultiple);
router.patch('/:id', middleware.auth, media.updateSingle);
router.post('/:mode', middleware.auth, media.uploadSingle);

export default router;

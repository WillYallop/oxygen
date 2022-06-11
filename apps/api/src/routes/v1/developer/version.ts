import express from 'express';
import { version } from '../../../controllers/v1/developer';

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// routes
// ------------------------------------

router.post('/:libraryId/:version', middleware.auth, version.createSingle);
router.get('/active/:libraryId', middleware.auth, version.getActive);
router.get('/:libraryId/:cursor/:take', middleware.auth, version.getMultiple);

export default router;

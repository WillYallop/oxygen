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

router.post(
    '/:type/:libraryId/:version',
    middleware.auth,
    version.createSingle,
);

export default router;

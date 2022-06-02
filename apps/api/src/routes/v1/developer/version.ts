import express from 'express';
import { version } from '../../../controllers/v1/developer';
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post(
    '/:type/:library_id/:version',
    middleware.auth,
    version.createSingle,
);

export default router;

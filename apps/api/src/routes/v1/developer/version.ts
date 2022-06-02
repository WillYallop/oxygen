import express from 'express';
import { version } from '../../../controllers/v1/developer';
import { authMiddleware } from '../../../middleware';
const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post('/version/:version', authMiddleware, version.createSingle);

export default router;

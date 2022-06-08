import express from 'express';
import { cdn } from '../../../controllers/v1/core';

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// routes
// ------------------------------------

router.get('/:key', middleware.cdnImageAuth, cdn.streamMedia);

export default router;

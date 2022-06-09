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

router.get('/library/:key', middleware.cdnLibAuth, cdn.streamMedia);

export default router;

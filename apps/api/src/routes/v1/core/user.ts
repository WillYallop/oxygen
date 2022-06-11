import express from 'express';
import { user } from '../../../controllers/v1/core';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/me', middleware.auth, user.getCurrent);

export default router;

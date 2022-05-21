import express from 'express';
import { user } from '../../../controllers/v1/core';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/user/:id', user.getSingle);

export default router;

import express from 'express';
import { authentication } from '../../../controllers/v1/core';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post('/register', authentication.registerUser);
router.post('/signin', authentication.signIn);
router.post('/reset/password', authentication.resetPassword);
router.post('/reset/password/update', authentication.updatePassword);

export default router;

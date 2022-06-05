import express from 'express';
import { setting } from '../../../controllers/v1/developer';

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/setting', middleware.auth, setting.getAll);
router.patch('/setting/profile', middleware.auth, setting.profileUpdate);
router.patch('/setting/account', middleware.auth, setting.accountUpdate);
router.post('/setting/stripe/connect', middleware.auth, setting.stripeConnect);

export default router;

import express from 'express';
import { setting } from '../../../controllers/v1/developer';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/setting', setting.getAll);
router.patch('/setting/profile', setting.profileUpdate);
router.patch('/setting/account', setting.accountUpdate);
router.post('/setting/stripe/connect', setting.stripeConnect);

export default router;

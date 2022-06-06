import express from 'express';
import { setting } from '../../../controllers/v1/developer';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

// ------------------------------------
// routes
// ------------------------------------

router.get('/', middleware.auth, setting.getAll);
router.patch('/profile', middleware.auth, setting.profileUpdate);
router.patch('/account', middleware.auth, setting.accountUpdate);
router.post('/stripe/connect', middleware.auth, setting.stripeConnect);

export default router;

import express from 'express';
import {
    componentLibrary,
    kitLibrary,
    pluginLibrary,
} from '../../../controllers/v1/developer';
import { authMiddleware } from '../../../middleware';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/component/:id', authMiddleware, componentLibrary.getSingle);
router.get(
    '/component/:offset/:limit',
    authMiddleware,
    componentLibrary.getMultiple,
);
router.post('/component', authMiddleware, componentLibrary.createSingle);
router.patch('/component', authMiddleware, componentLibrary.updateSingle);
router.delete('/component/:id', authMiddleware, componentLibrary.deleteSingle);

// Kits
router.get('/kit/:id', authMiddleware, kitLibrary.getSingle);
router.get('/kit/:offset/:limit', authMiddleware, kitLibrary.getMultiple);
router.post('/kit', authMiddleware, kitLibrary.createSingle);
router.patch('/kit', authMiddleware, kitLibrary.updateSingle);
router.delete('/kit/:id', authMiddleware, kitLibrary.deleteSingle);

// Plugins
router.get('/kit/:id', authMiddleware, pluginLibrary.getSingle);
router.get('/kit/:offset/:limit', authMiddleware, pluginLibrary.getMultiple);
router.post('/kit', authMiddleware, pluginLibrary.createSingle);
router.patch('/kit', authMiddleware, pluginLibrary.updateSingle);
router.delete('/kit/:id', authMiddleware, pluginLibrary.deleteSingle);

export default router;

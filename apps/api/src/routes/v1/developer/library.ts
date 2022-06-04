import express from 'express';
import {
    componentLibrary,
    kitLibrary,
    pluginLibrary,
} from '../../../controllers/v1/developer';
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/component/:id', middleware.auth, componentLibrary.getSingle);
router.get(
    '/component/:offset/:limit',
    middleware.auth,
    componentLibrary.getMultiple,
);
router.post('/component', middleware.auth, componentLibrary.createSingle);
router.patch('/component/:id', middleware.auth, componentLibrary.updateSingle);
router.delete('/component/:id', middleware.auth, componentLibrary.deleteSingle);

// Kits
router.get('/kit/:id', middleware.auth, kitLibrary.getSingle);
router.get('/kit/:offset/:limit', middleware.auth, kitLibrary.getMultiple);
router.post('/kit', middleware.auth, kitLibrary.createSingle);
router.patch('/kit', middleware.auth, kitLibrary.updateSingle);
router.delete('/kit/:id', middleware.auth, kitLibrary.deleteSingle);

// Plugins
router.get('/kit/:id', middleware.auth, pluginLibrary.getSingle);
router.get('/kit/:offset/:limit', middleware.auth, pluginLibrary.getMultiple);
router.post('/kit', middleware.auth, pluginLibrary.createSingle);
router.patch('/kit', middleware.auth, pluginLibrary.updateSingle);
router.delete('/kit/:id', middleware.auth, pluginLibrary.deleteSingle);

export default router;

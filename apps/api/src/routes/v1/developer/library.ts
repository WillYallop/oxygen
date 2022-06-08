import express from 'express';
import {
    componentLibrary,
    kitLibrary,
    pluginLibrary,
    library,
} from '../../../controllers/v1/developer';

// ------------------------------------
// middleware
// ------------------------------------
import middleware from '../../../middleware';

const router = express.Router();

// ------------------------------------
// routes
// ------------------------------------

// Shared
router.post('/media/:type/:id/:tag', middleware.auth, library.uploadImage);

// Components
router.get('/component/:id', middleware.auth, componentLibrary.getSingle);
router.get(
    '/component/:cursor/:take/:order',
    middleware.auth,
    componentLibrary.getMultiple,
);
router.post('/component', middleware.auth, componentLibrary.createSingle);
router.patch('/component/:id', middleware.auth, componentLibrary.updateSingle);
router.patch(
    '/component/deactivate/:state/:id',
    middleware.auth,
    componentLibrary.deactivateSingle,
);

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

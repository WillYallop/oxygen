import express from 'express';
import {
  componentLibrary,
  kitLibrary,
  pluginLibrary,
} from '../../../controllers/v1/developer';

const router = express.Router();

// ------------------------------------
// middleware
// ------------------------------------

// ------------------------------------
// routes
// ------------------------------------

// Components
router.get('/component/:id', componentLibrary.getSingle);
router.get('/component/:offset/:limit', componentLibrary.getMultiple);
router.post('/component', componentLibrary.createSingle);
router.patch('/component', componentLibrary.updateSingle);
router.delete('/component/:id', componentLibrary.deleteSingle);

// Kits
router.get('/kit/:id', kitLibrary.getSingle);
router.get('/kit/:offset/:limit', kitLibrary.getMultiple);
router.post('/kit', kitLibrary.createSingle);
router.patch('/kit', kitLibrary.updateSingle);
router.delete('/kit/:id', kitLibrary.deleteSingle);

// Plugins
router.get('/kit/:id', pluginLibrary.getSingle);
router.get('/kit/:offset/:limit', pluginLibrary.getMultiple);
router.post('/kit', pluginLibrary.createSingle);
router.patch('/kit', pluginLibrary.updateSingle);
router.delete('/kit/:id', pluginLibrary.deleteSingle);

export default router;

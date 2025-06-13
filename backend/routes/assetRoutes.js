import express from 'express';
import { createAsset, getAllAssets, updateAsset, deleteAsset } from '../controllers/assetController.js';
import { verifyToken } from '../controllers/authController.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllAssets);
router.post('/', verifyToken, isAdmin, createAsset);
router.put('/:id', verifyToken, isAdmin, updateAsset);
router.delete('/:id', verifyToken, isAdmin, deleteAsset);

export default router;

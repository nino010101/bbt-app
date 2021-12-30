import express from 'express'
import root from './root'
import data from './data'

const router = express.Router();
router.use(root);
router.use(data);

export default router;


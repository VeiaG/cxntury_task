import { Router, type Router as ExpressRouter } from 'express';
import { getSession } from '../controllers/sessionController';

const router: ExpressRouter = Router();

router.get('/', getSession); 

export default router;

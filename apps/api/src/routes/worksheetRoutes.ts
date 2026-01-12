import { Router, type Router as ExpressRouter } from 'express';
import { getTasks, submitAnswers } from '../controllers/taskController';
const router: ExpressRouter = Router();

router.get('/', getTasks);
router.post('/:taskId/answer',submitAnswers); 

export default router;

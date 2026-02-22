import { Router, json } from 'express';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../handlers/todoHandlers.js';
import { healthCheck } from '../handlers/healthHandler.js';

const router = Router();

router.use(json());

router.get('/health', healthCheck);

router.post('/todos', createTodo);
router.get('/todos', getAllTodos);
router.get('/todos/:id', getTodoById);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;

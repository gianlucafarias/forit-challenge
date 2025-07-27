import { Router } from 'express'
import { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from '../controllers/tasksController'

const router = Router()

router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.patch('/tasks/:id', toggleTaskStatus)
router.delete('/tasks/:id', deleteTask)

export default router
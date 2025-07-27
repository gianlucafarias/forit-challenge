import { Request, Response } from 'express'
import { Task } from '../models/task'

let tasks: Task[] = []

/*
    getTasks: Obtiene todas las tareas
*/
export const getTasks = (req: Request, res: Response) => {
    try {
                res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' })
    }
}

/*
    createTask: Crea una nueva tarea
*/
export const createTask = (req: Request, res: Response) => {
    const { title, description, completed = false } = req.body
    try {
        const task: Task = {
            id: tasks.length + 1,
            title,
            description,
            completed,
            createdAt: new Date()
        }
        tasks.push(task)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' })
    } 
}

/*
    updateTask: Actualiza una tarea
*/
export const updateTask = (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, completed } = req.body
    try {
        const task = tasks.find(task => task.id === parseInt(id))
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }
        task.title = title
        task.description = description
        if (completed !== undefined) {
            task.completed = completed
        }
        res.status(200).json({ message: 'Tarea actualizada correctamente', task })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' })
    }
}

/*
    toggleTaskStatus: Cambia el estado de completado de una tarea
*/
export const toggleTaskStatus = (req: Request, res: Response) => {
    const { id } = req.params
    const { completed } = req.body
    try {
        const task = tasks.find(task => task.id === parseInt(id))
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }
        task.completed = completed
        res.status(200).json({ 
            message: completed ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente',
            task 
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado de la tarea' })
    }
}

/*
    deleteTask: Elimina una tarea
*/
export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const task = tasks.find(task => task.id === parseInt(id))
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }
        tasks = tasks.filter(task => task.id !== parseInt(id))
        res.status(200).json({ message: 'Tarea eliminada correctamente', task })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' })
    }
}


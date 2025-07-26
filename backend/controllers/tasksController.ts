import { Request, Response } from 'express'
import { Task } from '../models/task'

let tasks: Task[] = []

/*
    getTasks: Obtiene todas las tareas
*/
export const getTasks = (req: Request, res: Response) => {
    try {
        res.status(200).json(tasks)
        if (tasks.length === 0) {
            res.status(200).json({ message: 'No hay tareas' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' })
    }
}

/*
    createTask: Crea una nueva tarea
*/
export const createTask = (req: Request, res: Response) => {
    const { title, description } = req.body
    try {
        const task: Task = {
            id: tasks.length + 1,
            title,
            description,
            completed: false,
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
    const { title, description } = req.body
    try {
        const task = tasks.find(task => task.id === parseInt(id))
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' })
        }
        task.title = title
        task.description = description
        res.json(task)
        res.status(200).json({ message: 'Tarea actualizada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' })
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
        res.json(task)
        res.status(200).json({ message: 'Tarea eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' })
    }
}


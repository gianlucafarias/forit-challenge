"use server"

import { taskSchema } from "@/lib/schemas/tasksSchema";

type ReturnType = {
    errors: Record<string, unknown>;
    message: string;
}

const API_URL = "http://localhost:3008/api";

export async function createTask(data: { title: string; description: string; completed?: boolean }): Promise<ReturnType> {
    const validatedFields = taskSchema.safeParse({
        title: data.title,
        description: data.description,
        completed: data.completed || false,
        createdAt: new Date(),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Error al crear la tarea",
        };
    }

    const { title, description, completed } = validatedFields.data;

    try {
        const response = await fetch(`http://localhost:3008/api/tasks`, {
            method: "POST",
            body: JSON.stringify({ title, description, completed }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            return {
                errors: {   
                    server: "Error al crear la tarea",
                },
                message: "Error al crear la tarea",
            };
        }
        return {
            errors: {},
            message: "Tarea creada correctamente",
        };
    } catch (error) {
        return {
            errors: {
                server: "Error al crear la tarea",
            },
            message: "Error al crear la tarea",
        };
    }
}

export async function deleteTask(id: number): Promise<ReturnType> {
    try {
        const response = await fetch(`http://localhost:3008/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            return {
                errors: {
                    server: "Error al eliminar la tarea",
                },
                message: "Error al eliminar la tarea",
            };
        }
        return {
            errors: {},
            message: "Tarea eliminada correctamente",
        };
    } catch (error) {
        return {
            errors: {
                server: "Error al eliminar la tarea",
            },
            message: "Error al eliminar la tarea",
        };
    }
}

export async function updateTask(id: number, data: { title: string; description: string; completed?: boolean }): Promise<ReturnType> {
    const validatedFields = taskSchema.safeParse({
        title: data.title,
        description: data.description,
        completed: data.completed || false,
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Error al actualizar la tarea",
        };
    }
    const { title, description, completed } = validatedFields.data;
    try {
        const response = await fetch(`http://localhost:3008/api/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description, completed }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            return {
                errors: {
                    server: "Error al actualizar la tarea",
                },
                message: "Error al actualizar la tarea",
            };
        }
        return {
            errors: {},
            message: "Tarea actualizada correctamente",
        };
    } catch (error) {
        return {
            errors: {
                server: "Error al actualizar la tarea",
            },
            message: "Error al actualizar la tarea",
        };
    }
}

export async function toggleTaskStatus(id: number, completed: boolean): Promise<ReturnType> {
    try {
        const response = await fetch(`http://localhost:3008/api/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ completed }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            return {
                errors: {
                    server: "Error al actualizar el estado de la tarea",
                },
                message: "Error al actualizar el estado de la tarea",
            };
        }
        return {
            errors: {},
            message: completed ? "Tarea marcada como completada" : "Tarea marcada como pendiente",
        };
    } catch (error) {
        return {
            errors: {
                server: "Error al actualizar el estado de la tarea",
            },
            message: "Error al actualizar el estado de la tarea",
        };
    }
}


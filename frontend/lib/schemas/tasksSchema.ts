import { z } from 'zod'

export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, { message: 'El titulo es requerido' }),
    description: z.string().min(1, { message: 'La descripcion es requerida' }),
    completed: z.boolean().default(false),
    createdAt: z.date().default(new Date()),
})
import { z } from 'zod'

export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, { message: 'El titulo es requerido' }),
    description: z.string().min(1, { message: 'La descripcion es requerida' }),
    completed: z.boolean().optional().default(false),
})

export type Task = {
    id: number
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
  };
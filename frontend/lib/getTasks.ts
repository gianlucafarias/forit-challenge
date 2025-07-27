import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetchTasks = createZodFetcher();


export async function getTasks() {
    try {
        const tasks = await fetchTasks(
            z.array(z.object({
                id: z.number(),
                title: z.string(),
                description: z.string(),
                completed: z.boolean(),
                createdAt: z.coerce.date(),
            })),
            `http://localhost:3008/api/tasks`,
            { cache: "no-store" }
        );
        console.log("Tareas obtenidas:", tasks);
        return tasks;
    } catch (error) {
        console.error("Error en getTasks:", error);
        throw error;
    }
}

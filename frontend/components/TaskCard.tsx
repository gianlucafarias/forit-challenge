import { taskSchema } from "@/lib/schemas/tasksSchema"
import { z } from "zod"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon, PencilIcon, TrashIcon } from "lucide-react"
export default function TaskCard({ task }: { task: z.infer<typeof taskSchema> }) {
    const { id, title, description, completed, createdAt } = task
        if(!completed){
            return (  
        <div>
            <Card className="w-full h-50">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Tarea {id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                    
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Fecha: {createdAt.toLocaleDateString()}</p>
                    <div className="flex items-center ">
                    <Button variant="outline" size="icon" className="mr-2">
                        <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="mr-2">
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>  
    )}
    else{
        return (
            <div>
                <Card className="w-full h-50">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>Tarea {id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Fecha: {createdAt.toLocaleDateString()}</p>
                        <div className="flex items-center ">
                            <CheckIcon className="w-4 h-4 mr-2" />
                            <p className="text-sm text-gray-500">Completada</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }
    
}
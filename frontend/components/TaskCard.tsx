
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon, PencilIcon, TrashIcon, CircleIcon } from "lucide-react"
import { Task } from "@/lib/schemas/tasksSchema"

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, completed: boolean) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
    const { id, title, description, completed, createdAt } = task

    const handleEdit = () => {
        onEdit(task);
    }

    const handleDelete = () => {
        onDelete(id);
    }

    const handleToggleStatus = () => {
        console.log(`TaskCard: Cambiando estado de tarea ${id} de ${completed} a ${!completed}`);
        onToggleStatus(id, !completed);
    }

    if(!completed){
        return (  
        <div>
            <Card className="w-full h-50">
                <CardHeader className="relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>Tarea {id}</CardDescription>
                        </div>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleToggleStatus}
                            className="ml-2"
                            title="Marcar como completada"
                        >
                            <CircleIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Fecha: {createdAt.toLocaleDateString()}</p>
                    <div className="flex items-center">
                        <Button variant="outline" size="icon" className="mr-2" onClick={handleEdit}>
                            <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={handleDelete}>
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
                <Card className="w-full h-50 bg-green-100/50">
                    <CardHeader className="relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>Tarea {id}</CardDescription>
                            </div>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={handleToggleStatus}
                                className="ml-2 bg-green-500/50 hover:bg-green-500/70"
                                title="Marcar como pendiente"
                            >
                                <CheckIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Fecha: {createdAt.toLocaleDateString()}</p>
                        <div className="flex items-center">
                            <Button variant="outline" size="icon" className="mr-2" onClick={handleEdit}>
                                <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="icon" onClick={handleDelete}>
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }
    
}
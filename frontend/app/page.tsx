import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const tasks = [
    {
      id: 1,
      title: "Tarea 1",
      description: "Descripcion 1",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Tarea 2",
      description: "Descripcion 2",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: "Tarea 3",
      description: "Descripcion 3",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: 4,
      title: "Tarea 4",
      description: "Descripcion 4",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 5,
      title: "Tarea 5",
      description: "Descripcion 5",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 6,
      title: "Tarea 6",
      description: "Descripcion 6",
      completed: false,
      createdAt: new Date(),
    }
  ]
  return (
  
   <div className="p-4 max-w-7xl mx-auto items-center justify-center w-full" >

    <div className="flex justify-between items-center w-full p-4 mb-4">
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="completed">Completadas</TabsTrigger>
        <TabsTrigger value="pending">Pendientes</TabsTrigger>
      </TabsList>
    </Tabs>
    <Button ><PlusIcon className="w-4 h-4 mr-1" /> Nueva Tarea </Button> 
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
        </div>

  );
}

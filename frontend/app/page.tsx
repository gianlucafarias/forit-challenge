"use client";

import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Task } from "@/lib/schemas/tasksSchema";
import TaskForm from "@/components/TaskModal";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { getTasks } from "@/lib/getTasks";
import { createTask, updateTask, deleteTask, toggleTaskStatus } from "./actions/actions";


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    
    getTasks()
      .then((tasks) => {
        
        setTasks(tasks);
        setFilteredTasks(tasks);
        setIsLoading(false);
        console.log(tasks);
        
      })
      .catch((error) => {
        console.error('Error al cargar tareas:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredTasks(applyFilters(tasks));
  }, [search, tasks, activeTab]);

  const handleOpenModal = () => {
    setEditingTask(null);
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
    setEditingTask(null);
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  }

  const handleDeleteTask = async (id: number) => {
    try {
      const result = await deleteTask(id);
      if(result.errors && Object.keys(result.errors).length > 0) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        const newTasks = await getTasks();
        setTasks(newTasks);
        setFilteredTasks(applyFilters(newTasks));
      }
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  }

  const handleToggleStatus = async (id: number, completed: boolean) => {
    console.log(`Intentando cambiar estado de tarea ${id} a ${completed}`);
    try {
      const result = await toggleTaskStatus(id, completed);
      console.log('Resultado del toggle:', result);
      if(result.errors && Object.keys(result.errors).length > 0) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        const newTasks = await getTasks();
        setTasks(newTasks);
        setFilteredTasks(applyFilters(newTasks));
      }
    } catch (error) {
      console.error('Error en handleToggleStatus:', error);
      toast.error("Error al cambiar el estado de la tarea");
    }
  }

  const handleSubmit = async (data: { title: string; description: string; completed: boolean; id?: number | null }, isEdit: boolean) => {
    console.log(data, isEdit);
    setOpen(false);
    setEditingTask(null);
    
    try {
      if(isEdit){
        const result = await updateTask(data.id!, data);
        if(result.errors && Object.keys(result.errors).length > 0) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
          const newTasks = await getTasks();
          setTasks(newTasks);
          setFilteredTasks(applyFilters(newTasks));
        }
      }else{
        const result = await createTask(data);
        if(result.errors && Object.keys(result.errors).length > 0) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
          const newTasks = await getTasks();
          setTasks(newTasks);
          setFilteredTasks(applyFilters(newTasks));
        }
      }
    } catch (error) {
      toast.error("Error al procesar la tarea");
    }
  }

  const handleSearch = () => {
    console.log(search);
    setFilteredTasks(applyFilters(tasks));
  }
  const applyFilters = (tasksToFilter: Task[]) => {
    let filtered = tasksToFilter;
    
    // Aplicar filtro por estado de completado
    if(activeTab === "completed"){
      filtered = filtered.filter((task) => task.completed === true);
    } else if(activeTab === "pending"){
      filtered = filtered.filter((task) => task.completed === false);
    }
    // Para "all" no se aplica filtro, se muestran todas las tareas
    
    // Aplicar filtro de búsqueda
    if(search !== ""){
      filtered = filtered.filter((task) => 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return filtered;
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setFilteredTasks(applyFilters(tasks));
  }
  return (
  
   <div className="p-4 max-w-7xl mx-auto items-center justify-center w-full" >

    <div className="flex justify-between items-center w-full p-4 mb-4">
    <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="completed">Completadas</TabsTrigger>
        <TabsTrigger value="pending">Pendientes</TabsTrigger>
      </TabsList>
    </Tabs>
    <div className="flex items-center gap-1 w-1/2">
      <Input type="text" placeholder="Buscar tarea" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" />
      <Button variant="outline" size="icon" className="mr-5 cursor-pointer" onClick={handleSearch}>
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
    <Button onClick={handleOpenModal} className="cursor-pointer"><PlusIcon className="w-4 h-4 mr-1" /> Nueva Tarea </Button> 
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-8">
                <p>Cargando tareas...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p>No hay tareas disponibles</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            )}
        </div>
        <TaskForm
          open={open}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          defaultValues={editingTask ? { id: editingTask.id, title: editingTask.title, description: editingTask.description, completed: editingTask.completed } : undefined}
        />
  </div>
        

  );
}

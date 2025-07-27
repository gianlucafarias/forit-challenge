"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const taskFormSchema = z.object({
  title: z.string().min(1, { message: 'El título es requerido' }),
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  completed: z.boolean(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData & { id?: number | null }, isEdit: boolean) => void;
  defaultValues?: TaskFormData & { id?: number };
}

export default function TaskForm({ open, onClose, onSubmit, defaultValues }: TaskModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: defaultValues || {
            title: "",
            description: "",
            completed: false,
        },
    });

    const completed = watch("completed");

  useEffect(() => {
    reset(defaultValues || { title: "", description: "", completed: false });
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit({ ...data, id: defaultValues?.id || null }, !!defaultValues?.id); 
  };

  const handleCompletedChange = (checked: boolean) => {
    setValue("completed", checked);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>{defaultValues?.id ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Título" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>
          
          <div>
            <Textarea placeholder="Descripción" {...register("description")} className="h-24" />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            <div className="flex items-center space-x-2 mt-2">
              <Switch 
                id="completed" 
                checked={completed} 
                onCheckedChange={handleCompletedChange}
              />
              <Label htmlFor="completed">Completada</Label>
            </div>
          </div>

        
          <Button type="submit" disabled={isSubmitting}>
            {defaultValues?.id ? "Guardar cambios" : "Crear tarea"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
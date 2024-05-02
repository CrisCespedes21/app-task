import { Tarea, TaskStore } from "@/lib/definiciones";
import { create } from "zustand";

// Definimos el estado inicial del almacenamiento
const initialTasks: Tarea[] = [];

// Definimos el almacén utilizando Zustand
const useTaskStore = create<TaskStore>((set:any) => ({
  // Estado inicial
  tasks: initialTasks,

  // Función para agregar una nueva tarea al almacenamiento
  addTask: (newTask: Tarea) =>

    
    set((state: TaskStore) => ({
      tasks: [...state.tasks, newTask],
    })),

  // Función para actualizar una tarea existente en el almacenamiento
  updateTask: (taskId: string, updatedTask: Partial<Tarea>) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),

  // Función para eliminar una tarea del almacenamiento
  deleteTask: (taskId: string) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),

  // Función para marcar una tarea como terminada
  markTaskAsCompleted: (taskId: string) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, estado: "terminada" } : task
      ),
    })),

  // Función para marcar una tarea como pendiente
  markTaskAsPending: (taskId: string) =>
    set((state: TaskStore) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, estado: "pendiente" } : task
      ),
    })),
}));

export default useTaskStore;

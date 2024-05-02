"use client";
import { ChevronRight } from "lucide-react";
import { Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Tarea, colores, coloresClasses } from "@/lib/definiciones";
import useTaskStore from "@/storages/taskStorage";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import NoWorkResult from "postcss/lib/no-work-result";

export const NuevaTarea = () => {
  // Establece la navegacion

  const router = useRouter();

  const { addTask } = useTaskStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  // Función para agregar una nueva tarea al almacenamiento
  const getClassName = (color: string) => {
    if (color === colorActivo) {
      return `sm:w-8 sm:h-8 w-6 h-6 rounded-full outline-none ring-2 ${coloresClasses[color].bgActivo} ${coloresClasses[color].ring}`;
    } else {
      return `sm:w-8 sm:h-8 w-6 h-6 rounded-full ${coloresClasses[color].bg}`;
    }
  };

  // Estados para los colores, categorias y frecuencia
  const [frecuencia, setFrecuencia] = useState("");
  const [colorActivo, setColorActivo] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("");
  const [cicloActivo, setCicloActivo] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Manejo del formulario
  const onSubmit = (data: any) => {
    const nuevaTarea: Tarea = {
      id: Date.now().toString(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      color: data.color,
      categoria: data.categoria,
      ciclo: data.ciclo,
      frecuencia: data.frecuencia,
      estado: "pendiente",
      dias: [],
    };
    console.log(nuevaTarea);
    addTask(nuevaTarea);
    router.push("/");
  };

  // Manejo de los cambios en el switch
  const handelSwitchChange = (ciclo: boolean) => {
    setValue("ciclo", ciclo);
    setCicloActivo(ciclo);
  };
  // Manejo de la frecuencia
  const handleFrecuencia = (frecuencia: string) => {
    setValue("frecuencia", frecuencia);
    setFrecuencia(frecuencia);
  };
  // Manejo del color
  const handleColor = (color: string) => {
    setColorActivo(color);
    setValue("color", color);
  };
  // Manejo de la categoria
  const handleCategoria = (categoria: string) => {
    setValue("categoria", categoria);
    setCategoriaActiva(categoria);
  };

  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays: any) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(
          (selectedDay: any) => selectedDay !== day
        );
      } else {
        return [...prevSelectedDays, day];
      }
    });
    setValue("dias", selectedDays);
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <form
          className="flex w-full flex-col  max-w-screen-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Header */}
          <div className="flex items-center mb-3 justify-between">
            <h1 className="text-xl sm:text-2xl font-bold mr-2"> Nueva Tarea</h1>
            <div className="flex">
              <Button className="flex gap-3" variant="default" type="submit">
                <Save className="w-[18px]  h-[18px]" />
                Guardar Tarea
              </Button>
            </div>
          </div>
          {/* Formulario */}
          <div className="p-0 ">
            {/* Impust */}
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  required
                  id="nombre"
                  placeholder="Nombre de tu nueva tarea"
                  {...register("nombre")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  required
                  id="descripcion"
                  placeholder="Describe tu nueva tarea"
                  {...register("descripcion")}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center my-4">
            <h2 className="font-semibold text-lg">
              Selecciona el color para la tarea
            </h2>
          </div>
          {/*Selección de Color  */}
          <div className="flex sm:justify-center justify-start gap-8 flex-wrap">
            <input required type="hidden" />
            {colores.map((color) => (
              <button
                value={color}
                key={color}
                type="button"
                className={getClassName(color)}
                onClick={() => handleColor(color)}
              ></button>
            ))}
          </div>
          <Card className="mt-3 p-3">
            <div className="flex flex-col sm:flex-row flex-grow justify-around p-3">
              {/* Ciclo de la tarea */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <h2 className="text-sm font-semibold text-zinc-900	mr-2">
                    Establezca un ciclo para su tarea
                  </h2>
                  <Switch
                    checked={cicloActivo}
                    onCheckedChange={handelSwitchChange}
                  />
                </div>
                <Separator></Separator>
                <div className="w-full flex justify-center">
                  <div className="bg-gray-100 flex flex-row w-fit  rounded-full m-0">
                    <Button
                      type="button"
                      variant={
                        frecuencia === "Diariamente" ? "default" : "secondary"
                      }
                      className="rounded-full shadow-none"
                      onClick={() => handleFrecuencia("Diariamente")}
                    >
                      Diariamente
                    </Button>
                    <Button
                      type="button"
                      variant={
                        frecuencia === "Semalmente" ? "default" : "secondary"
                      }
                      className="rounded-full shadow-none"
                      onClick={() => handleFrecuencia("Semalmente")}
                    >
                      Semalmente
                    </Button>
                    <Button
                      type="button"
                      variant={
                        frecuencia === "Mensualmente" ? "default" : "secondary"
                      }
                      className="rounded-full shadow-none"
                      onClick={() => handleFrecuencia("Mensualmente")}
                    >
                      Mensualmente
                    </Button>
                  </div>
                </div>
                <Separator></Separator>
                <div>
                  <div className="flex h-8 items-center text-sm justify-between">
                    <Button
                      type="button"
                      variant={
                        selectedDays.includes("LU") ? "default" : "secondary"
                      }
                      className="rounded-full w-8 h-8"
                      onClick={() => toggleDaySelection("LU")}
                    >
                      <p>LU</p>
                    </Button>
                    <Separator className="" orientation="vertical" />
                    <Button
                      type="button"
                      variant={
                        selectedDays.includes("MA") ? "default" : "secondary"
                      }
                      className="rounded-full w-8 h-8 "
                      onClick={() => toggleDaySelection("MA")}
                    >
                      <p>MA</p>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                      type="button"
                      className="rounded-full w-8 h-8 "
                      variant={
                        selectedDays.includes("MI") ? "default" : "secondary"
                      }
                      onClick={() => toggleDaySelection("MI")}
                    >
                      <p>MI</p>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                      type="button"
                      variant={
                        selectedDays.includes("JU") ? "default" : "secondary"
                      }
                      onClick={() => toggleDaySelection("JU")}
                      className="rounded-full w-8 h-8 "
                    >
                      <p>JU</p>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                      type="button"
                      variant={
                        selectedDays.includes("VI") ? "default" : "secondary"
                      }
                      onClick={() => toggleDaySelection("VI")}
                      className="rounded-full w-8 h-8 "
                    >
                      <p>VI</p>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                      type="button"
                      variant={
                        selectedDays.includes("SA") ? "default" : "secondary"
                      }
                      onClick={() => toggleDaySelection("SA")}
                      className="rounded-full w-8 h-8 "
                    >
                      <p>SA</p>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                      type="button"
                      variant={
                        selectedDays.includes("DO") ? "default" : "secondary"
                      }
                      onClick={() => toggleDaySelection("DO")}
                      className="rounded-full w-8 h-8 "
                    >
                      <p>DO</p>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Button type="button" variant="secondary">
                    {" "}
                    Repetir{" "}
                  </Button>
                  <Button type="button" variant="secondary" size="icon">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
              {/* Categoria para la tarea */}
              <div className="flex flex-col gap-3 mr-2">
                <h2 className="text-sm font-semibold  text-zinc-900">
                  Establezca una etiqueta para su tarea
                </h2>
                <Separator></Separator>
                <div className=" gap-2 flex flex-col sm:flex-row sm:w-fit w-auto rounded-3xl sm:rounded-full m-0 text-neutral-800">
                  <Button
                    type="button"
                    onClick={() => handleCategoria("Rutina Diaria")}
                    variant={
                      categoriaActiva === "Rutina Diaria"
                        ? "default"
                        : "secondary"
                    }
                    className="rounded-full"
                  >
                    Rutina Diaria
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleCategoria("Rutina de Estudio")}
                    variant={
                      categoriaActiva === "Rutina de Estudio"
                        ? "default"
                        : "secondary"
                    }
                    className="rounded-full"
                  >
                    Rutina de Estudio
                  </Button>
                  {/* <Button
                    variant="secondary"
                    className="rounded-full text-current"
                  >
                    Añadir más
                    <Plus className="w-4 h-4" />
                  </Button> */}
                </div>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
};

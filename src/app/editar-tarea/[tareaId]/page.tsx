import { EditarTarea } from "@/components/editarTarea/EditarTarea";

export default function Page({ params }: any) {
  const tareaId = params.tareaId;

  return <EditarTarea id={tareaId} />;
}

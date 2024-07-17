import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUpdateManagedRestaurant } from "../../../../app/hooks/use-update-managed-restaurant";
import { useManagedRestaurant } from "../../../../app/hooks/useManagedRestaurant";
import { Button } from "../../../components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

type TypeSchema = z.infer<typeof schema>;

export function RestaurantProfile() {
  const { data } = useManagedRestaurant();
  const { mutateAsync, isPending } = useUpdateManagedRestaurant();
  const { register, handleSubmit: onUpdate } = useForm<TypeSchema>({
    resolver: zodResolver(schema),
    values: {
      name: data?.name ?? "",
      description: data?.description ?? "",
    },
  });

  const handleSubmit = onUpdate(async ({ description, name }: TypeSchema) => {
    try {
      await mutateAsync({ description, name });

      toast.success("Dados atualizados com sucesso!");
    } catch (e) {
      toast.error("Algo deu errado");
    }
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="name"
              {...register("description")}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <DialogClose>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>

            <Button disabled={isPending} variant="success">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const schema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type TypeSchema = z.infer<typeof schema>;

export function TableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");
  const {
    register,
    control,
    reset,
    handleSubmit: onFormFiltering,
  } = useForm<TypeSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  const handleSubmit = onFormFiltering(
    ({ customerName, orderId, status }: TypeSchema) => {
      setSearchParams((state) => {
        if (orderId) {
          state.set("orderId", orderId);
        } else {
          state.delete("orderId");
        }

        if (customerName) {
          state.set("customerName", customerName);
        } else {
          state.delete("customerName");
        }

        if (status) {
          state.set("status", status);
        } else {
          state.delete("status");
        }

        state.set("page", "1");
        return state;
      });
    },
  );

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");

      return state;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-2 md:flex-row"
    >
      <label>Filtros:</label>
      <div className="flex w-full items-center gap-2">
        <Input
          className="h-8 w-32 md:w-auto"
          placeholder="ID do pedido"
          {...register("orderId")}
        />
        <Input
          className="h-8 w-full max-w-[320px]"
          placeholder="Nome do cliente"
          {...register("customerName")}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value, name, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                onValueChange={onChange}
                name={name}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Em preparo</SelectItem>
                  <SelectItem value="delivering">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="xs" type="submit">
          <Search className="mr-2 size-4" />
          Filtrar resultados
        </Button>

        <Button
          onClick={handleClearFilters}
          variant="secondary"
          size="xs"
          type="submit"
        >
          <X className="mr-2 size-4" />
          Remover filtros
        </Button>
      </div>
    </form>
  );
}

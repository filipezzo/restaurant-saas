import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useRegister } from "../../../app/hooks/useRegister";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const schema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type TypeSchema = z.infer<typeof schema>;

export function SignUp() {
  const {
    register,
    handleSubmit: handleSignUp,
    formState: { isValid },
  } = useForm<TypeSchema>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: registerRestaurant } = useRegister();
  const nav = useNavigate();

  const handleSubmit = handleSignUp(async (data: TypeSchema) => {
    try {
      await registerRestaurant({ ...data });
      toast.success("Conta criada com sucesso", {
        action: {
          label: "faça login!",
          onClick: () => nav(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
    }
  });
  return (
    <>
      <Helmet title="Cadastro" />

      <div className="flex w-full max-w-[350px] flex-col gap-4">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Faça login</Link>
        </Button>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">Criar conta grátis</h2>
          <p className="text-sm">Seja um parceiro e comece suas vendas!</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label className="text-sm" htmlFor="restaurant">
              Nome do estabelecimento
            </Label>
            <Input id="restaurant" required {...register("restaurantName")} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm" htmlFor="manager">
              Seu nome
            </Label>
            <Input id="manager" required {...register("managerName")} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm" htmlFor="email">
              Seu email
            </Label>
            <Input id="email" required type="email" {...register("email")} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm" htmlFor="phone">
              Seu celular
            </Label>
            <Input id="tel" required {...register("phone")} />
          </div>
          <Button disabled={!isValid} className="text-center">
            Finalizar cadastro.
          </Button>
          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos termos de serviço e políticas
            de privacidade.
          </p>
        </form>
      </div>
    </>
  );
}

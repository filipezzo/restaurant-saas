import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useSignIn } from "../../../app/hooks/useSignIn";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const schema = z.object({
  email: z.string().email(),
});

type TypeSchema = z.infer<typeof schema>;

export function Signin() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit: handleLogin,
    formState: { isValid },
  } = useForm<TypeSchema>({
    defaultValues: { email: searchParams.get("email") ?? "" },
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useSignIn();

  const handleSubmit = handleLogin(async (data: TypeSchema) => {
    try {
      await mutateAsync({ email: data.email });
      toast.success("Email enviado com sucesso", {
        action: {
          label: "Reenviar",
          onClick: handleSubmit,
        },
      });
    } catch (error) {
      toast.error("Algo deu errado ao realizar login");
    }
  });
  return (
    <>
      <Helmet title="Login" />
      <div className="flex w-full max-w-[350px] flex-col gap-3">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">Acessar painel</h2>
          <p className="text-sm">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2">
            <Label htmlFor="email">seu email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <Button disabled={!isValid} className="text-center">
            Acessar painel
          </Button>
        </form>
      </div>
    </>
  );
}

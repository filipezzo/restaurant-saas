import { DialogTrigger } from "@radix-ui/react-dialog";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSignout from "../../app/hooks/use-signout";
import { useManagedRestaurant } from "../../app/hooks/useManagedRestaurant";
import { useMe } from "../../app/hooks/useMe";
import { RestaurantProfile } from "../pages/app/dashboard/restaurant-profile";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
  const { data: profile, isLoading } = useMe();
  const { data: managedRestaurant } = useManagedRestaurant();
  const { mutateAsync, isPending } = useSignout();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await mutateAsync();
      navigate("/sign-in", { replace: true });
    } catch (e) {
      toast.error("Erro ao deslogar");
    }
  };
  return (
    <Dialog>
      {isLoading && <Skeleton className="h-8 w-20" />}
      {profile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex select-none items-center gap-2"
            >
              {managedRestaurant?.name}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>{profile?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <Building className="mr-2 size-4" />
                <span className="text-xs">Perfil do restaurante</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <RestaurantProfile />

            <DropdownMenuItem
              asChild
              disabled={isPending}
              className="cursor-pointer text-rose-500 dark:text-rose-400"
            >
              <button onClick={handleClick} className="w-full">
                <LogOut className="mr-2 size-4" />
                Sair
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <RestaurantProfile />
    </Dialog>
  );
}

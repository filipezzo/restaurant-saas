import { UtensilsCrossed } from "lucide-react";
import { Outlet } from "react-router-dom";

export function Authlayout() {
  return (
    <div className="flex h-screen flex-col md:grid md:grid-cols-2">
      <section className="bg-muted border-r-foreground/5 flex flex-col justify-between border-r p-10 md:h-full">
        <h1 className="text-foreground flex items-center gap-3 text-lg font-semibold">
          <UtensilsCrossed />
          Restaurant
        </h1>
        <footer className="hidden text-sm md:block">
          Painel do parceiro &copy; restaurant. - {new Date().getFullYear()}
        </footer>
      </section>
      <main className="relative flex h-full p-10 md:items-center md:justify-center">
        <Outlet />
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="flex items-center gap-2">
        Voltar para o{" "}
        <Link
          className="flex h-10 items-center justify-center rounded-md bg-slate-500 px-6"
          to="/"
        >
          dashboard
        </Link>
      </p>
    </div>
  );
}

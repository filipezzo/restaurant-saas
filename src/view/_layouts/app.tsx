import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../../app/lib/api";
import { Header } from "../components/header";

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            navigate("/sign-in", { replace: true });
          }
        }

        return () => {
          api.interceptors.response.eject(interceptId);
        };
      },
    );
  }, [navigate]);
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-8 pt-4">
        <Outlet />
      </main>
    </div>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { Router } from "./app/router/router";
import "./global.css";
import { ThemeProvider } from "./view/components/theme/theme-provider";
const queryClient = new QueryClient();
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet titleTemplate="%s | Restaurant " />
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

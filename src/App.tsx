import { ToastProvider } from "./components/layout/ToastProvider";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/TanStack";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LoadingProvider>
        <ToastProvider>
          <RouterProvider router={routes} />
        </ToastProvider>
      </LoadingProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}

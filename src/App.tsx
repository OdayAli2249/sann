import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { queryClient } from "./lib/reactQuery";
import { AuthContextProvider } from "./context/auth";
import { UIContextProvider } from "./context/ui";
import { AlertsContextProvider } from "./context/alerts";
import { TranslationProvider } from "./translation";
import Routes from "./Routes";

function App() {
  return (
    <UIContextProvider>
      <QueryClientProvider client={queryClient}>
        <AlertsContextProvider>
          <AuthContextProvider>
            <TranslationProvider>
              <Routes />
            </TranslationProvider>
          </AuthContextProvider>
        </AlertsContextProvider>
      </QueryClientProvider>
    </UIContextProvider>
  );
}

export default App;

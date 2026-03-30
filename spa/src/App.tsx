import { SnackbarProvider } from "notistack";
import { AppRoutes } from "./routes";

const App = () => (
  <SnackbarProvider autoHideDuration={2000}>
    <AppRoutes />
  </SnackbarProvider>
);

export default App;

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "../src/auth/AuthProvider";

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
      <AuthProvider></AuthProvider>
    </div>
  );
};

export default App;

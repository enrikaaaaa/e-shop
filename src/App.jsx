import AppRoutes from "./routes/AppRoutes";
// import AuthProvider from "../src/auth/AuthProvider";
import { ThemeProvider } from "../src/contexts/ThemeContexts/ThemeContexts";
import { UserProvider } from "../src/contexts/UserContext/UserContext";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider>
          {/* <AuthProvider> */}
          <AppRoutes />
          {/* </AuthProvider> */}
        </ThemeProvider>
      </UserProvider>
    </div>
  );
};

export default App;

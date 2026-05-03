import { useEffect } from "react";
import { useAuth } from "../features/Authentication/hook/useAuth";
import AppRoutes from "./AppRoutes";

function App() {
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;

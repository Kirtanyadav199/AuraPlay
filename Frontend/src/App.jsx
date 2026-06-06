import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./Features/Shared/Styles/global.scss";
import { AuthProvider } from "./Features/auth/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

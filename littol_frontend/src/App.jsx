import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import AppProvider from "./context/AppProvider";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;

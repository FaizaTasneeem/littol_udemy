import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import UserProvider from "./context/UserProvider";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;

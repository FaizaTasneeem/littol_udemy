import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

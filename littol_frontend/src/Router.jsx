import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            }
        ]
    }
]);

export default router
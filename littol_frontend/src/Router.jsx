import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <Navbar/>,
                children: [
                    {
                        path: "/home",
                        element: <Home/>
                    },
                    {
                        path: "/courses",
                        element: <Courses/>
                    },
                ]
            }
        ]
    }
]);

export default router
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import LessonDetails from "./pages/LessonDetails";

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
                        path: "/dashboard",
                        element: <Dashboard/>
                    },
                    {
                        path: "/courses",
                        element: <Courses/>
                    },
                    {
                        path: "/profile",
                        element: <Profile/>
                    },
                    {
                        path: "/courseDetails/:id",
                        element: <CourseDetails/>
                    },
                    {
                        path: "/lessonDetails/:id",
                        element: <LessonDetails/>
                    },
                ]
            }
        ]
    }
]);

export default router
import UserProvider from "./UserProvider";
import CourseProvider from "./CourseProvider";

function AppProvider({ children }) {
  return (
    <UserProvider>
        <CourseProvider>
            {children}
        </CourseProvider>
    </UserProvider>
  )
}

export default AppProvider
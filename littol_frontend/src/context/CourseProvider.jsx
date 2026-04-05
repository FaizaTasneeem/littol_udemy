import { useState } from 'react';
import { CourseContext } from './AppContext';

export default function CourseProvider({ children }) {
    const [courseList, setCourseList] = useState([]);
        
    return (
        <CourseContext.Provider value={{ courseList, setCourseList }}>
            {children}
        </CourseContext.Provider>
    );
}

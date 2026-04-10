import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { searchCourse } from '../services/courseService';
import { userStore, courseStore } from '../store/AppStore';

function SearchCourses({ setFilteredCourseList }) {
    const {accessToken} = userStore();
    const {courseList} = courseStore();
    const [searchResultsSuggestion, setSearchResultsSuggestion] = useState([]);
    const [query, setQuery] = useState(null);
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery) {
            console.log(debouncedQuery);
            sendSearchCourseRequest();
        }
    }, [debouncedQuery]);
    
    function handleSearchInputChange(event) {
        setQuery(event.target.value);
    }

    function handleFilterOptionsChange(event) {
        const id = event.target.id;
        const value = event.target.value;
        const filteredList = courseList.filter(course => ( course[id] === value ));
        setFilteredCourseList(filteredList);
    }

    async function sendSearchCourseRequest() {
        try {
            const response = await searchCourse(debouncedQuery, accessToken);
            console.log(response.data);
            setSearchResultsSuggestion(response.data.searchResultsSuggestion);
        }
        catch(error) {
            console.log("❌ Course search failed. Please try again...", error);
        }
    };

    return (
        <div className="w-full bg-gray-100 mt-10 rounded-lg flex flex-col">
            <input type="text" onChange={handleSearchInputChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Search courses by title, description and instructor...' />
            {/* {searchResultsSuggestion.length !== 0 && searchResultsSuggestion.map(result => (
                <div>{result}</div>
            ))} */}
        
            <div className="pt-2 w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="category" className="mx-2">Category</label>
                    <select id="category" onChange={handleFilterOptionsChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
                        <option>All</option>
                        <option>category1</option>
                        <option>category2</option>
                    </select>
                </div>
            
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="level" className="mx-2">Level</label>
                    <select id="level" onChange={handleFilterOptionsChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
                        <option>All</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
            </div>
        </div>
    )

}

export default SearchCourses
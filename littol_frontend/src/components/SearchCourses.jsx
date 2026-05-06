import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { searchCourse, filterCourse } from '../services/courseService';
import { userStore, courseStore } from '../store/AppStore';
import SearchResult from './SearchResult';

function SearchCourses() {
    const {accessToken} = userStore();
    const {filterPage, setFilterPage, setTotalFilterPages, setFilteredCourseList} = courseStore();
    
    const [searchResultsSuggestion, setSearchResultsSuggestion] = useState([]);
    const [selectInput, setSelectInput] = useState({category:"All", level:"All"});
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    
    const keysArray = Object.keys(selectInput);
    
    function handleSearchInputChange(event) {
        setQuery(event.target.value);
    };

    async function sendCourseSearchRequest() {
        try {
            const response = await searchCourse(debouncedQuery, accessToken);
            setSearchResultsSuggestion(response.data.searchResultsSuggestion);
        }
        catch(error) {
            console.log("❌ Course search failed. Please try again...", error);
        }
    };

    async function handleFilterOptionsChange(event) {
        const id = event.target.id;
        const value = event.target.value;

        const newSelectInput = {...selectInput, [id]: value};
        setSelectInput(newSelectInput);
        setFilterPage(1);
    }


    async function sendCourseFilterRequest(filterPage, newSelectInput) {
        const keysToBeFiltered = keysArray.filter(key => newSelectInput[key] !== "All");
        const filter = keysToBeFiltered.reduce((prev, cur) => ({...prev, [cur] : newSelectInput[cur]}), {});
        
        const response = await filterCourse(filter, filterPage, 3, accessToken);
        return response;
    };
    
    useEffect(() => {
        if (debouncedQuery) {
            sendCourseSearchRequest();
        }
    }, [debouncedQuery]);

    useEffect(() => {
        // if (keysArray.every(key => selectInput[key] === 'All')) return;
        async function getFilteredCourses() {
            try {
                console.log(selectInput);
                const response = await sendCourseFilterRequest(filterPage, selectInput);
                setFilteredCourseList([...response.data.filterResults]);
                setTotalFilterPages(response.data.totalFilterPages);
            }
            catch(error) {
                console.log("❌ Course filter failed. Please try again...", error);
            }
        }
        
        if (filterPage) {
            console.log(filterPage);
            getFilteredCourses();
        }

    }, [filterPage, selectInput]);
    
    return (
        <div className="w-full p-4 bg-white mt-10 rounded-lg flex flex-col">
            <input type="text" onChange={handleSearchInputChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Search courses by title, description and instructor...' />
            
            {searchResultsSuggestion.length !== 0 && 
                <div className="bg-white m-2 border border-gray-300 rounded-lg">
                    {searchResultsSuggestion.map(result => (<SearchResult key={result._id} result={result}/>))}
                </div>
            }

            {debouncedQuery && searchResultsSuggestion.length === 0 && 
                <div className="bg-white m-2 border border-gray-300 rounded-lg">
                    No results found !
                </div>
            }
        
            <div className="pt-2 w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="category" className="mx-2">Category</label>
                    <select id="category" onChange={handleFilterOptionsChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg">
                        <option>All</option>
                        <option>category1</option>
                        <option>category2</option>
                    </select>
                </div>
            
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="level" className="mx-2">Level</label>
                    <select id="level" onChange={handleFilterOptionsChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg">
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
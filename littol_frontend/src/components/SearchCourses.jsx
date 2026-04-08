import { useState, useEffect } from 'react';

function SearchCourses() {
    const [query, setQuery] = useState(null);
    const [debouncedQuery, setDebouncedQuery] = useState(null);

    useEffect(() => {
        const handleTimer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500)

        return () => {
            clearTimeout(handleTimer);
        }
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            console.log(debouncedQuery);
        }
    }, [debouncedQuery]);
    
    function handleSearchInputChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div className="w-full bg-gray-100 mt-10 rounded-lg flex flex-col">
            <input type="text" onChange={handleSearchInputChange} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Search courses by title, description and instructor...' />
        
            <div className="pt-2 w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="category" className="mx-2">Category</label>
                    <select id="category" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
                        <option>category1</option>
                        <option>category2</option>
                    </select>
                </div>
            
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="level" className="mx-2">Level</label>
                    <select id="level" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
                        <option>level1</option>
                        <option>level2</option>
                    </select>
                </div>
            </div>
        </div>
    )

}

export default SearchCourses
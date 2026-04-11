import { courseStore } from '../store/AppStore';

function SearchResult({result}) {
    const {setFilteredCourseList} = courseStore();
    return (
        <div onClick={() => setFilteredCourseList([result])} className="rounded-sm border border-gray-200 hover:bg-gray-400 cursor-pointer">
            {result.title}-{result.description}
        </div>
    )
}

export default SearchResult;

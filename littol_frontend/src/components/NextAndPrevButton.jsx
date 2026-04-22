import { courseStore } from "../store/AppStore";

function NextAndPrevButton({mainList}) {
    const {page, setPage, filterPage, setFilterPage, totalPages, totalFilterPages} = courseStore();
    
    function handlePageIncrement() {
        mainList ? setPage(page + 1) : setFilterPage(filterPage + 1);
    }

    function handlePageDecrement() {
        mainList ? setPage(page - 1) : setFilterPage(filterPage - 1);
    }

    return (
        <div className="mt-4 flex flex-row justify-between">
            <button 
                onClick={handlePageDecrement} 
                disabled={(mainList && page === 1) || (!mainList && filterPage === 1)} 
                className="shadow rounded-lg p-4 flex items-center mr-2 cursor-pointer text-gray-500 bg-[linear-gradient(135deg,rgba(129,122,235,0.42),rgba(168,162,255,0.30))]">{'<<'}
            </button>
            
            <button 
                onClick={handlePageIncrement} 
                disabled={(mainList && page >= totalPages) || (!mainList && filterPage >= totalFilterPages)} 
                className="shadow rounded-lg p-4 flex items-center mr-2 cursor-pointer text-gray-500 bg-[linear-gradient(135deg,rgba(104,96,232,0.52),rgba(79,70,229,0.36))]">{'>>'}
            </button>
        </div>
    )
}

export default NextAndPrevButton
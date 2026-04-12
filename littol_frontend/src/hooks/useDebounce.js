import { useState, useEffect } from "react";

function useDebounce(query, timer) {
    const [debouncedQuery, setDebouncedQuery] = useState(null);

    useEffect(() => {
        const handleTimer = setTimeout(() => {
            setDebouncedQuery(query);
        }, timer);

        return () => {
            return clearTimeout(handleTimer);
        }
    }, [query]);

    return debouncedQuery;
}

export default useDebounce;

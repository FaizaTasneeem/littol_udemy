import { useState, useEffect } from "react";

function useDebounce(query, timer) {
    const [debouncedQuery, setdebouncedQuery] = useState(null);

    useEffect(() => {
        const handleTimer = setTimeout(() => {
            setdebouncedQuery(query);
        }, timer);

        return () => {
            return clearTimeout(handleTimer);
        }
    }, [query]);

    return debouncedQuery;
}

export default useDebounce;

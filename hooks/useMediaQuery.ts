import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        const updateMatches = () => {
            setMatches(media.matches);
        };

        updateMatches();
    }, [query]);

    return matches;
}

export default useMediaQuery;
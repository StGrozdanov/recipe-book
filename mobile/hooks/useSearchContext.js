import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export const useSearchContext = () => {
    const searchState = useContext(SearchContext);

    return searchState;
}
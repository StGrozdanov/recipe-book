import { useContext } from "react";
import { LoadedDataContext } from "../contexts/LoadedDataContext";

export const useLoadDataContext = () => {
    const loadState = useContext(LoadedDataContext);

    return loadState;
}
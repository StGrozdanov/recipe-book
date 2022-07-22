import { createContext, useState } from 'react';

export const LoadedDataContext = createContext();

export const LoadedDataProvider = ({ children }) => {
    const [loadedData, setLoadedData] = useState(null);

    return (
        <LoadedDataContext.Provider value={{ loadedData, setLoadedData }}>
            {children}
        </LoadedDataContext.Provider>
    );
};
import { useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';

export const useAppState = () => {
    const { items, dispatch, ...state } = useContext(AppContext);
    return { ...state, items, dispatch }; 
};

export const useAppDispatch = () => {
    const { dispatch } = useContext(AppContext);
    return dispatch; 
};

export const useAppItems = () => {
    const { items } = useContext(AppContext);
    return items; 
};

export const useFetchData = (url, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }
                const result = await response.json();
                
                setData(result);
            } catch (error) {
                setIsError(true);
                console.error("Błąd pobierania danych:", error);
            }
            
            setIsLoading(false);
        };

        if (url) {
            fetchData();
        }
    }, [url]);

    return { data, isLoading, isError };
};
import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {

    const [compareProducts, setCompareProducts] = useState([]);

    const addToCompare = (product) => {

        setCompareProducts((prev) => {

            if (prev.find((p) => p.id === product.id)) {
                return prev;
            }

            if (prev.length >= 2) {
                return prev;
            }

            return [...prev, product];
        });

    };

    const removeFromCompare = (id) => {

        setCompareProducts((prev) =>
            prev.filter((p) => p.id !== id)
        );

    };

    const clearCompare = () => {

        setCompareProducts([]);

    };

    return (
        <CompareContext.Provider
            value={{
                compareProducts,
                addToCompare,
                removeFromCompare,
                clearCompare
            }}
        >
            {children}
        </CompareContext.Provider>
    );

}

export const useCompare = () => useContext(CompareContext);
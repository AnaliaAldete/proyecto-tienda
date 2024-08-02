import { createContext, useState, useContext } from "react";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
	return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
};

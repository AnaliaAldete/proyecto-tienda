import { createContext, useState, useContext, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
	const [productosArray, setProductosArray] = useState([]);

	useEffect(() => {
		const collectionReference = collection(db, "productos");
		onSnapshot(collectionReference, (data) => {
			const NewProductosArray = data?.docs?.map((producto) => {
				return { ...producto.data(), id: producto.id };
			});
			setProductosArray(NewProductosArray);
		});
	}, []);

	return (
		<OrderContext.Provider value={{ productosArray }}>
			{children}
		</OrderContext.Provider>
	);
};

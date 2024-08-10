import { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
	const [productosArray, setProductosArray] = useState([]);
	const [carrito, setCarrito] = useState([]);

	const agregarAlCarrito = (producto) => {
		setCarrito((prev) => [...prev, producto]);
	};

	const eliminarDelCarrito = (productoId) => {
		setCarrito((prev) => prev.filter((producto) => producto.id !== productoId));
	};

	const vaciarCarrito = () => {
		setCarrito([]);
	};

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
		<OrderContext.Provider
			value={{
				productosArray,
				carrito,
				agregarAlCarrito,
				eliminarDelCarrito,
				vaciarCarrito,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

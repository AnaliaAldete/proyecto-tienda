import { createContext, useState, useContext, useEffect } from "react";
import { OrderContext } from "./OrderContext";

export const FiltrosContext = createContext(null);

export const FiltrosProvider = ({ children }) => {
	const { productosArray } = useContext(OrderContext);
	const [productosFiltrados, setProductosFiltrados] = useState([]);
	const [valueSearch, setValueSearch] = useState();
	console.log(productosFiltrados);
	console.log(productosArray);

	useEffect(() => {
		filtrarProductos();
	}, [valueSearch, productosArray]);

	const filtrarProductos = () => {
		if (valueSearch) {
			const arrayFiltrado = productosArray.filter((producto) =>
				producto.nombre.toLowerCase().includes(valueSearch.toLowerCase())
			);
			setProductosFiltrados(arrayFiltrado);
		} else {
			setProductosFiltrados(productosArray);
		}
	};

	return (
		<FiltrosContext.Provider value={{ productosFiltrados, setValueSearch }}>
			{children}
		</FiltrosContext.Provider>
	);
};

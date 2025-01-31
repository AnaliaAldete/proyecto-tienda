import { createContext, useState, useContext, useEffect } from "react";
import { OrderContext } from "./OrderContext";

export const FiltrosContext = createContext(null);

export const FiltrosProvider = ({ children }) => {
	const { productosArray } = useContext(OrderContext);
	const [productosFiltrados, setProductosFiltrados] = useState([]);
	const [valueSearch, setValueSearch] = useState("");
	const [categorias, setCategorias] = useState([]);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

	useEffect(() => {
		filtrarProductos();
	}, [valueSearch, categoriaSeleccionada, productosArray]);

	useEffect(() => {
		extraerCategorias();
	}, [productosArray]);

	const filtrarProductos = () => {
		if (valueSearch) {
			const normalizeString = (str) =>
				str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			const arrayFiltrado = productosArray.filter((producto) =>
				normalizeString(producto.nombre.toLowerCase()).includes(
					normalizeString(valueSearch.toLowerCase())
				)
			);
			setProductosFiltrados(arrayFiltrado);
		} else if (categoriaSeleccionada && categoriaSeleccionada !== "Todas") {
			const arrayFiltrado = productosArray.filter(
				(producto) => producto.categoria === categoriaSeleccionada
			);
			setProductosFiltrados(arrayFiltrado);
		} else {
			setProductosFiltrados(productosArray);
		}
	};

	const extraerCategorias = () => {
		const categoriasUnicas = [
			"Todas",
			...new Set(productosArray.map((producto) => producto.categoria)),
		];
		setCategorias(categoriasUnicas);
	};

	const resetearFiltros = () => {
		setValueSearch("");
		setCategoriaSeleccionada("Todas");
	};

	return (
		<FiltrosContext.Provider
			value={{
				productosFiltrados,
				setValueSearch,
				setCategoriaSeleccionada,
				categorias,
				resetearFiltros,
				valueSearch,
			}}
		>
			{children}
		</FiltrosContext.Provider>
	);
};

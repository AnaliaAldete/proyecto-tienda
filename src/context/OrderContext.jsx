import { createContext, useState, useEffect, useContext } from "react";
import {
	collection,
	onSnapshot,
	doc,
	updateDoc,
	arrayUnion,
	getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "./UserContext";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
	const { usuario } = useContext(UserContext);
	const [productosArray, setProductosArray] = useState([]);
	const [carrito, setCarrito] = useState([]);

	//GET PRODUCTOS
	useEffect(() => {
		const collectionReference = collection(db, "productos");
		onSnapshot(collectionReference, (data) => {
			const NewProductosArray = data?.docs?.map((producto) => {
				return { ...producto.data(), id: producto.id };
			});
			setProductosArray(NewProductosArray);
		});
	}, []);

	//GET CARRITO
	useEffect(() => {
		if (usuario) {
			const userRef = doc(db, "usuarios", usuario.id);
			const handleCarrito = onSnapshot(
				userRef,
				(doc) => {
					if (doc.exists()) {
						setCarrito(doc.data().carrito || []);
					}
				},
				(error) => {
					console.error("Error al escuchar los cambios en el carrito:", error);
				}
			);
			return () => handleCarrito();
		}
	}, [usuario]);

	const agregarAlCarrito = async (producto) => {
		setCarrito((prevCarrito) => {
			const productoExistente = prevCarrito.some(
				(item) => item.id === producto.id
			);
			if (productoExistente) {
				return prevCarrito;
			}
			return [...prevCarrito, producto];
		});
		try {
			const userRef = doc(db, "usuarios", usuario.id);
			await updateDoc(userRef, {
				carrito: arrayUnion(producto),
			});
		} catch (error) {
			console.error(
				"Error al agregar el producto al carrito en Firebase:",
				error
			);
		}
	};

	const eliminarDelCarrito = (productoId) => {
		setCarrito((prev) => prev.filter((producto) => producto.id !== productoId));
	};

	const vaciarCarrito = () => {
		setCarrito([]);
	};

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

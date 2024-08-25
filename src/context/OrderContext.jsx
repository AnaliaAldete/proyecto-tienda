import { createContext, useState, useEffect, useContext } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "./UserContext";
import { Snackbar, Alert } from "@mui/material";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
	const { usuario } = useContext(UserContext);
	const [productosArray, setProductosArray] = useState([]);
	const [carrito, setCarrito] = useState([]);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	//GET PRODUCTOS
	useEffect(() => {
		const collectionReference = collection(db, "productos");
		const unsubscribe = onSnapshot(collectionReference, (data) => {
			const NewProductosArray = data?.docs?.map((producto) => ({
				...producto.data(),
				id: producto.id,
			}));
			setProductosArray(NewProductosArray);
		});
		return () => unsubscribe();
	}, []);

	//GET CARRITO
	useEffect(() => {
		if (usuario) {
			const userRef = doc(db, "usuarios", usuario.id);
			const unsubscribe = onSnapshot(userRef, (doc) => {
				const carritoFirebase = doc.data()?.carrito || [];
				setCarrito(carritoFirebase);
			});
			return () => unsubscribe();
		} else {
			setCarrito([]);
		}
	}, [usuario]);

	// Sincronizar carrito con Firebase
	useEffect(() => {
		const sincronizarFirebase = async () => {
			if (usuario) {
				const userRef = doc(db, "usuarios", usuario.id);
				try {
					await updateDoc(userRef, { carrito });
				} catch (error) {
					console.error("Error al sincronizar el carrito con Firebase:", error);
				}
			}
		};
		sincronizarFirebase();
	}, [carrito, usuario]);

	const agregarAlCarrito = (producto) => {
		setCarrito((prevCarrito) => {
			const productoExistente = prevCarrito.find(
				(item) => item.id === producto.id
			);
			if (productoExistente) {
				setSnackbarMessage("El producto ya está en el carrito");
				setOpenSnackbar(true);
				return prevCarrito;
			}
			setSnackbarMessage("Producto cargado con éxito");
			setOpenSnackbar(true);
			return [...prevCarrito, { ...producto, cantidad: 1 }];
		});
	};

	const actualizarCantidad = (productoId, cambio) => {
		setCarrito((prevCarrito) =>
			prevCarrito.map((producto) =>
				producto.id === productoId
					? { ...producto, cantidad: producto.cantidad + cambio }
					: producto
			)
		);
	};

	const eliminarDelCarrito = (productoId) => {
		setCarrito((prev) => prev.filter((producto) => producto.id !== productoId));
	};

	const vaciarCarrito = async () => {
		try {
			if (usuario) {
				const userRef = doc(db, "usuarios", usuario.id);
				await updateDoc(userRef, {
					carrito: [],
				});
				setCarrito([]);
			}
		} catch (error) {
			console.error("Error al vaciar el carrito en Firebase:", error);
		}
	};

	return (
		<OrderContext.Provider
			value={{
				productosArray,
				carrito,
				agregarAlCarrito,
				eliminarDelCarrito,
				vaciarCarrito,
				setCarrito,
				actualizarCantidad,
			}}
		>
			{children}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="success"
					variant="filled"
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</OrderContext.Provider>
	);
};

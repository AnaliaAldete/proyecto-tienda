import React from "react";
import { useContext, useState } from "react";
import {
	Box,
	Typography,
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { OrderContext } from "../context/OrderContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const Checkout = () => {
	const { carrito, vaciarCarrito } = useContext(OrderContext);
	const { usuario } = useContext(UserContext);
	const [openDialog, setOpenDialog] = useState(false);
	const navigate = useNavigate();

	const total = carrito.reduce(
		(total, producto) => total + producto.precio * (producto.cantidad || 1),
		0
	);

	const confirmarPedido = async () => {
		if (usuario) {
			const userRef = doc(db, "usuarios", usuario.id);
			const nuevaOrden = {
				productos: carrito,
				total: total,
				fecha: new Date().toISOString(),
			};

			try {
				await updateDoc(userRef, {
					ordenes: [...usuario.ordenes, nuevaOrden],
				});
				vaciarCarrito();
				setOpenDialog(true);
			} catch (error) {
				console.error("Error al confirmar el pedido:", error);
			}
		}
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		navigate("/");
	};

	return (
		<Container maxWidth="md" sx={{ minHeight: "80vh" }}>
			<Box
				p={3}
				display="flex"
				flexDirection={"column"}
				alignItems="center"
				gap={3}
			>
				<Typography variant="h4">Checkout</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell>Producto</TableCell>
								<TableCell align="right">Precio</TableCell>
								<TableCell align="right">Cantidad</TableCell>
								<TableCell align="right">Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{carrito.map((producto) => (
								<TableRow key={producto.id}>
									<TableCell sx={{ maxWidth: 60 }}>
										<Avatar
											src={producto.imagen}
											alt={producto.nombre}
											sx={{ width: 56, height: 56 }}
										/>
									</TableCell>
									<TableCell component="th" scope="row">
										{producto.nombre}
									</TableCell>
									<TableCell align="right">${producto.precio}</TableCell>
									<TableCell align="right">{producto.cantidad || 1}</TableCell>
									<TableCell align="right">
										${producto.precio * (producto.cantidad || 1)}
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell colSpan={4} align="right">
									<Typography variant="h6">Total:</Typography>
								</TableCell>
								<TableCell align="right">
									<Typography variant="h6">${total}</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Button variant="contained" color="primary" onClick={confirmarPedido}>
					Confirmar pedido
				</Button>
			</Box>
			<Dialog
				open={openDialog}
				aria-labelledby="confirmacion-dialog-title"
				aria-describedby="confirmacion-dialog-description"
				PaperProps={{
					sx: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					},
				}}
			>
				<DialogTitle id="confirmacion-dialog-title">
					¡Pedido confirmado!
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="confirmacion-dialog-description">
						Tu pedido ha sido confirmado con éxito.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseDialog}
						color="primary"
						variant="contained"
						size="small"
						autoFocus
					>
						Volver al inicio
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

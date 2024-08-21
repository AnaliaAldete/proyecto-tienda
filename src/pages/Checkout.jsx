import React from "react";
import { useContext, useState, useEffect } from "react";
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
	useMediaQuery,
	useTheme,
	Snackbar,
} from "@mui/material";
import { OrderContext } from "../context/OrderContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const Checkout = () => {
	const { carrito, vaciarCarrito } = useContext(OrderContext);
	const { usuario } = useContext(UserContext);
	const [openDialog, setOpenDialog] = useState(false);
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();
	const celu = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		if (!usuario) {
			navigate("/login");
		}
	}, [usuario]);

	const total = carrito.reduce(
		(total, producto) => total + producto.precio * producto.cantidad,
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
				setOpenErrorSnackbar(true);
			}
		}
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		navigate("/");
	};
	const handleCloseErrorSnackbar = () => {
		setOpenErrorSnackbar(false);
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
								{!celu && <TableCell></TableCell>}
								<TableCell>Producto</TableCell>
								{!celu && <TableCell align="right">Precio</TableCell>}
								{!celu && <TableCell align="right">Cantidad</TableCell>}
								<TableCell align="right">Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{carrito.map((producto) => (
								<TableRow key={producto.id}>
									{!celu && (
										<TableCell sx={{ maxWidth: 60 }}>
											<Avatar
												src={producto.imagen}
												alt={producto.nombre}
												sx={{ width: 56, height: 56 }}
											/>
										</TableCell>
									)}
									<TableCell component="th" scope="row">
										{producto.nombre}
										{celu && (
											<Typography variant="body2" mt={1}>
												${producto.precio} x {producto.cantidad}
											</Typography>
										)}
									</TableCell>
									{!celu && (
										<TableCell align="right">${producto.precio}</TableCell>
									)}

									{!celu && (
										<TableCell align="right">{producto.cantidad}</TableCell>
									)}
									<TableCell align="right">
										${producto.precio * producto.cantidad}
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell colSpan={celu ? 1 : 4} align="right">
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
				<Link to="/productos">Seguir comprando</Link>
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
			<Snackbar
				open={openErrorSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseErrorSnackbar}
				message="Error al confirmar el pedido. Inténtalo de nuevo."
			/>
		</Container>
	);
};

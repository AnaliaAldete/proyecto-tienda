import React from "react";
import { useContext, useEffect, useState } from "react";
import {
	Container,
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Ordenes = () => {
	const { usuario } = useContext(UserContext);
	const [ordenes, setOrdenes] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (usuario) {
			const userRef = doc(db, "usuarios", usuario.id);
			const unsubscribe = onSnapshot(userRef, (doc) => {
				const userData = doc.data();
				setOrdenes(userData?.ordenes || []);
			});
			return () => unsubscribe();
		} else {
			navigate("/login");
		}
	}, [usuario]);

	return (
		<Container maxWidth="md" sx={{ minHeight: "80vh", padding: 4 }}>
			<Typography variant="h4" gutterBottom align="center">
				Órdenes
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Fecha</TableCell>
							<TableCell>Productos</TableCell>
							<TableCell align="right">Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ordenes.map((orden, index) => (
							<TableRow key={index}>
								<TableCell>
									{new Date(orden.fecha).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{orden.productos.map((producto) => (
										<Box key={producto.id}>
											<Typography variant="body2">
												{producto.nombre} x {producto.cantidad}
											</Typography>
										</Box>
									))}
								</TableCell>
								<TableCell align="right">${orden.total}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

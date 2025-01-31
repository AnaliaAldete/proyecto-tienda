import React from "react";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActions,
	Button,
	IconButton,
	Grid,
	Container,
} from "@mui/material";
import { IoIosClose } from "react-icons/io";

export const CardDetalle = () => {
	const { agregarAlCarrito, productosArray } = useContext(OrderContext);
	const { id } = useParams();
	const { usuario } = useContext(UserContext);

	const navigate = useNavigate();

	const producto = productosArray.find((prod) => prod.id === id);

	const handleAgregarAlCarrito = () => {
		if (!usuario) {
			navigate("/login");
		} else {
			agregarAlCarrito(producto);
		}
	};
	return (
		<Container
			maxWidth="sm"
			sx={{
				marginBlock: { xs: "30px", sm: "50px" },
				padding: 0,
			}}
		>
			<Card sx={{ maxWidth: 600, borderRadius: 2, boxShadow: 3 }}>
				<Grid container sx={{ position: "relative" }}>
					<IconButton
						component={Link}
						to="/productos"
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
							padding: "2px",
							color: { xs: "white", sm: "rgba(0, 0, 0, 0.54)" },
						}}
					>
						<IoIosClose />
					</IconButton>
					<Grid item xs={12} sm={6}>
						<CardMedia
							component="img"
							alt={producto.nombre}
							image={producto.imagen}
							sx={{ height: "100%", objectFit: "cover" }}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CardContent
							sx={{
								display: "flex",
								flexDirection: "column",
								height: "100%",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "24px 16px",
							}}
						>
							<Typography variant="h5" component="div" gutterBottom>
								{producto.nombre}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								paragraph
								sx={{
									textAlign: { xs: "center", sm: "left" },
								}}
							>
								{producto.descripcionLarga}
							</Typography>
							<Typography variant="h6" color="text.primary" gutterBottom>
								${producto.precio}
							</Typography>
							<CardActions
								sx={{
									justifyContent: "center",
								}}
							>
								<Button
									variant="contained"
									size="small"
									sx={{ backgroundColor: "#0000FF" }}
									onClick={handleAgregarAlCarrito}
								>
									Agregar al carrito
								</Button>
							</CardActions>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</Container>
	);
};

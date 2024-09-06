import React, { useContext } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Carrusel } from "../componentes/Carrusel";
import { CardProducto } from "../componentes/CardProducto";
import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import { FaTruck, FaRegCreditCard, FaCheck } from "react-icons/fa";
import { OrderContext } from "../context/OrderContext";

export const Home = () => {
	const { productosArray } = useContext(OrderContext);

	const productosDestacados = productosArray.slice(0, 6);

	return (
		<Box
			sx={{
				backgroundColor: "#f5f5f5",
				display: "flex",
				flexDirection: "column",
				gap: { xs: 2, sm: 5 },
				paddingBottom: "40px",
			}}
		>
			<Carrusel />
			<Grid container paddingInline={2} gap={2} justifyContent={"center"}>
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ display: "flex", justifyContent: "center" }}>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
							<FaTruck size={35} />
							<Box textAlign={"center"}>
								<Typography variant="h6" gutterBottom>
									Entrega gratis
								</Typography>
								<Typography variant="body2">A partir de $100.000</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
							<FaRegCreditCard size={35} />

							<Box textAlign={"center"}>
								<Typography variant="h6" gutterBottom>
									Cuotas sin interés
								</Typography>
								<Typography variant="body2">En seleccionados</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ display: "flex", justifyContent: "center" }}>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
							<FaCheck size={35} />
							<Box textAlign={"center"}>
								<Typography variant="h6" gutterBottom>
									Compra Segura
								</Typography>
								<Typography variant="body2">Con garantía oficial</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<Box paddingInline={1}>
				<Typography
					variant="h4"
					gutterBottom
					textAlign={"center"}
					sx={{
						fontSize: {
							xs: "2rem",
							sm: "2.5rem",
						},
					}}
				>
					Productos Destacados
				</Typography>
				<Splide
					options={{
						perPage: 3,
						perMove: 1,
						gap: 16,
						arrows: true,
						pagination: true,
						breakpoints: {
							640: {
								perPage: 1,
							},
							768: {
								perPage: 2,
							},
						},
						padding: 10,
					}}
				>
					{productosDestacados.map((producto) => (
						<SplideSlide
							key={producto.id}
							style={{
								marginBottom: "8px",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<CardProducto
								nombre={producto.nombre}
								precio={producto.precio}
								descripcion={producto.descripcion}
								imagen={producto.imagen}
								id={producto.id}
							/>
						</SplideSlide>
					))}
				</Splide>
			</Box>
		</Box>
	);
};

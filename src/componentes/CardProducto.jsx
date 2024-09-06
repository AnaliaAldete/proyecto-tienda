import React from "react";
import { useNavigate } from "react-router-dom";

import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActions,
	Button,
} from "@mui/material";

export const CardProducto = ({ id, nombre, precio, descripcion, imagen }) => {
	const navigate = useNavigate();
	const handleVerDetalle = () => {
		navigate(`/cardDetalle/${id}`);
	};

	return (
		<Card
			sx={{
				maxWidth: 330,
				borderRadius: 2,
				boxShadow: "0px 4px 8px rgb(0 0 0 / 50%)",
			}}
		>
			<CardMedia component="img" alt={nombre} height="250" image={imagen} />
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					textAlign: "center",
				}}
			>
				<Typography variant="subtitle1">{descripcion}</Typography>
				<Typography variant="h6" color="text.primary">
					${precio}
				</Typography>
			</CardContent>
			<CardActions
				disableSpacing
				sx={{
					paddingTop: 0,
					justifyContent: "center",
				}}
			>
				<Button
					variant="contained"
					size="small"
					sx={{ backgroundColor: "#0000FF" }}
					onClick={handleVerDetalle}
				>
					Ver detalle
				</Button>
			</CardActions>
		</Card>
	);
};

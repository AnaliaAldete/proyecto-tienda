import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActions,
	Button,
	CardHeader,
	styled,
	IconButton,
	Collapse,
} from "@mui/material";

import { MdOutlineExpandMore } from "react-icons/md";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export const CardProducto = ({
	nombre,
	precio,
	descripcion,
	imagen,
	descripcionLarga,
}) => {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card
			sx={{
				maxWidth: 345,
				borderRadius: 2,
				border: "2px solid #1976d2",
			}}
		>
			<CardHeader
				title={nombre}
				sx={{
					textAlign: "center",
				}}
			/>
			<CardMedia component="img" alt={nombre} height="194" image={imagen} />
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<Typography variant="body2" color="text.secondary">
					{descripcion}
				</Typography>
				<Typography variant="h6" color="text.primary">
					Precio: ${precio}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ paddingTop: 0 }}>
				<Button variant="contained" size="small">
					Agregar al carrito
				</Button>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<MdOutlineExpandMore />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent style={{ padding: "8px 16px 16px 16px" }}>
					<Typography paragraph sx={{ marginBottom: 0 }}>
						{descripcionLarga}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

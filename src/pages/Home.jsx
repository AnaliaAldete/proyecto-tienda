import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { CardProducto } from "../componentes/CardProducto";

export const ContainerProductos = () => {
	const { productosArray } = useContext(OrderContext);
	return (
		<Box sx={{ flexGrow: 1, padding: 4 }}>
			<Grid container spacing={2}>
				{productosArray.map((producto) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						display="flex"
						justifyContent="center"
						key={producto.id}
					>
						<CardProducto
							nombre={producto.nombre}
							precio={producto.precio}
							descripcion={producto.descripcion}
							descripcionLarga={producto.descripcionLarga}
							imagen={producto.imagen}
							id={producto.id}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

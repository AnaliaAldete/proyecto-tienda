import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { FiltrosContext } from "../context/FiltrosContext";
import { CardProducto } from "../componentes/CardProducto";

export const ContainerProductos = () => {
	const { productosArray } = useContext(OrderContext);
	const { productosFiltrados } = useContext(FiltrosContext);
	const renderArray = productosFiltrados.length
		? productosFiltrados
		: productosArray;
	return (
		<Box
			sx={{
				flexGrow: 1,
				padding: 4,
				backgroundColor: "#f5f5f5",
				display: "flex",
				justifyContent: "center",
				minHeight: "80vh",
			}}
		>
			<Grid container spacing={2} sx={{ maxWidth: "1100px" }}>
				{renderArray.map((producto) => (
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
							imagen={producto.imagen}
							id={producto.id}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

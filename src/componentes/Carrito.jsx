import React, { useContext, useState } from "react";
import {
	Badge,
	IconButton,
	Drawer,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Avatar,
	Divider,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { OrderContext } from "../context/OrderContext";

export const Carrito = () => {
	const { carrito, eliminarDelCarrito, vaciarCarrito } =
		useContext(OrderContext);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open) => () => {
		setDrawerOpen(open);
	};

	return (
		<>
			<IconButton onClick={toggleDrawer(true)}>
				<Badge color="secondary" badgeContent={carrito.length}>
					<FaShoppingCart size={24} />
				</Badge>
			</IconButton>
			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
				<Box
					sx={{
						width: 300,
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
					role="presentation"
					onClick={toggleDrawer(false)}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							padding: "8px 16px 0px 16px",
							alignItems: "center",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography variant="h6" align="center">
								Mi Carrito
							</Typography>
							{carrito.length > 0 && (
								<Typography
									variant="body2"
									component="span"
									sx={{
										fontSize: "0.875rem",
										marginLeft: "4px",
									}}
								>
									({carrito.length}{" "}
									{carrito.length === 1 ? "producto" : "productos"})
								</Typography>
							)}
						</Box>
						<IconButton edge="end" aria-label="delete" onClick={vaciarCarrito}>
							<MdDelete />
						</IconButton>
					</Box>
					<Box
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
						}}
					>
						{carrito.length > 0 ? (
							<List>
								{carrito.map((producto, index) => (
									<React.Fragment key={producto.id}>
										<ListItem
											secondaryAction={
												<IconButton
													edge="end"
													aria-label="delete"
													onClick={() => eliminarDelCarrito(producto.id)}
												>
													<TiDelete />
												</IconButton>
											}
										>
											<Avatar
												src={producto.imagen}
												alt={producto.nombre}
												sx={{ width: 56, height: 56, mr: 2 }}
											/>
											<ListItemText
												primary={producto.nombre}
												secondary={`Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`}
											/>
										</ListItem>
										{index < carrito.length - 1 && (
											<Divider variant="inset" component="li" />
										)}
									</React.Fragment>
								))}
							</List>
						) : (
							<Box
								sx={{
									display: "flex",
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="body1" sx={{ p: 2 }}>
									El carrito está vacío
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			</Drawer>
		</>
	);
};

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
import { OrderContext } from "../context/OrderContext";

export const Carrito = () => {
	const { carrito } = useContext(OrderContext);
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
					<Typography variant="h6" align="center" sx={{ p: 1 }}>
						Mi Carrito
					</Typography>
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
												<IconButton edge="end" aria-label="delete">
													<MdDelete />
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

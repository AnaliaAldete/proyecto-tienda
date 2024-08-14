import React, { useContext, useState } from "react";
import {
	Badge,
	IconButton,
	Drawer,
	Box,
	Typography,
	List,
	ListItem,
	Avatar,
	Divider,
	Button,
	ButtonGroup,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {
	const { carrito, eliminarDelCarrito, vaciarCarrito, actualizarCantidad } =
		useContext(OrderContext);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navigate = useNavigate();

	const toggleDrawer = (open) => () => {
		setDrawerOpen(open);
	};

	const handleClickDrawer = (event) => {
		event.stopPropagation();
	};

	const finalizarCompra = () => {
		setDrawerOpen(false);
		navigate("/");
	};

	return (
		<>
			<IconButton onClick={toggleDrawer(true)}>
				<Badge color="secondary" badgeContent={carrito.length}>
					<FaShoppingCart size={24} />
				</Badge>
			</IconButton>
			<Drawer
				anchor="right"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				PaperProps={{
					onClick: (event) => event.stopPropagation(),
				}}
			>
				<Box
					sx={{
						width: 300,
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
					role="presentation"
					onClick={handleClickDrawer}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							padding: "8px 0px 8px 16px",
							alignItems: "center",
						}}
					>
						<Box sx={{ display: "flex" }}>
							<Typography
								variant="h6"
								align="center"
								sx={{ display: "flex", alignItems: "center" }}
							>
								Mi Carrito
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
							</Typography>
							{carrito.length > 1 && (
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={vaciarCarrito}
								>
									<RiDeleteBin5Line />
								</IconButton>
							)}
						</Box>
						<IconButton onClick={toggleDrawer(false)}>
							<IoIosClose />
						</IconButton>
					</Box>
					<Divider aria-hidden="true" />
					{carrito.length > 0 ? (
						<>
							<List sx={{ padding: 0 }}>
								{carrito.map((producto) => (
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
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													gap: 1,
												}}
											>
												<Typography variant="body1" component="div">
													{producto.nombre}
												</Typography>

												<ButtonGroup
													size="small"
													aria-label="small outlined button group"
												>
													<Button
														onClick={() => actualizarCantidad(producto.id, -1)}
													>
														-
													</Button>
													<Button
														disableElevation
														sx={{
															cursor: "default",
															"&:hover": {
																cursor: "default",
															},
														}}
													>
														{producto.cantidad || 1}
													</Button>
													<Button
														onClick={() => actualizarCantidad(producto.id, 1)}
													>
														+
													</Button>
												</ButtonGroup>
												<Typography variant="body2" component="span">
													Precio: ${producto.precio}
												</Typography>
											</Box>
										</ListItem>
										<Divider component="li" aria-hidden="true" />
									</React.Fragment>
								))}
							</List>

							<Box sx={{ padding: "16px" }}>
								<Typography
									variant="h6"
									sx={{ display: "flex", justifyContent: "space-between" }}
								>
									Total:
									<span>
										$
										{carrito.reduce(
											(total, producto) =>
												total + producto.precio * (producto.cantidad || 1),
											0
										)}
									</span>
								</Typography>
							</Box>
							<Divider aria-hidden="true" />
							<Button
								variant="contained"
								sx={{
									alignSelf: "center",
									marginTop: "16px",
								}}
								onClick={finalizarCompra}
							>
								Finalizar compra
							</Button>
						</>
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
			</Drawer>
		</>
	);
};

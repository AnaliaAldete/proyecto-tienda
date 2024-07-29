import React from "react";
import { Badge, IconButton } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";

export const Carrito = ({ toggleDrawer }) => {
	return (
		<IconButton onClick={toggleDrawer(true)}>
			<Badge color="secondary" badgeContent={23}>
				<FaShoppingCart size={24} />
			</Badge>
		</IconButton>
	);
};

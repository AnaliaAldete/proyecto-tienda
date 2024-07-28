import React from "react";
import { Badge } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";

export const Carrito = () => {
	return (
		<Badge color="secondary" badgeContent={23}>
			<FaShoppingCart size={24} />
		</Badge>
	);
};

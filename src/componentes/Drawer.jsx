import React from "react";
import { Drawer, Box, Typography, List, ListItem } from "@mui/material";

export const DrawerCarrito = ({ open, toggleDrawer }) => {
	return (
		<Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
			<Box
				sx={{ width: 300 }}
				role="presentation"
				onClick={toggleDrawer(false)}
			>
				<Typography variant="h6" sx={{ p: 2 }}>
					Compras
				</Typography>
				<List>
					<ListItem>1</ListItem>
					<ListItem>2</ListItem>
					<ListItem>3</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

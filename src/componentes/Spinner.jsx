import React from "react";
import { CircularProgress, Container } from "@mui/material";

export const Spinner = () => {
	return (
		<Container
			maxWidth="sm"
			sx={{
				minHeight: "80vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Container>
	);
};

import React from "react";
import { CircularProgress, Container } from "@mui/material";

export const Spinner = () => {
	return (
		<Container
			maxWidth="sm"
			sx={{
				minHeight: "85vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Container>
	);
};

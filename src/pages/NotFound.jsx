import { Box, Typography, Button } from "@mui/material";
import error404 from "../assets/error404.png";
import { Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

export const NotFound = () => {
	return (
		<Box
			sx={{
				backgroundImage: `url(${error404})`,
				backgroundSize: "cover",
				width: "100%",
				height: "85vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 3,
			}}
		>
			<Typography variant="h2" color={"white"}>
				ERROR 404
			</Typography>
			<Typography variant="h5" color={"white"}>
				Parece que no podemos encontrar la página que está buscando
			</Typography>
			<Button
				component={Link}
				to="/"
				variant="contained"
				startIcon={<IoArrowBackCircle />}
				sx={{ backgroundColor: "#0000FF", color: "white" }}
			>
				Volver a la Home
			</Button>
		</Box>
	);
};

import { Box, Grid, Typography } from "@mui/material";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";

export const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: "#0000FF",
				padding: "16px 16px 8px 16px",
				color: "white",
				textAlign: { xs: "center", md: "left" },
				minHeight: "20vh",
			}}
		>
			<Grid container>
				{/* Atención al Cliente */}
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>
						Atención al Cliente:
					</Typography>
					<Typography variant="body2" gutterBottom>
						0810-364-567.Lunes a viernes de 9 a 18hs.
					</Typography>
					<Typography variant="body2">consultas@techlink.com.ar</Typography>
				</Grid>

				{/* Sucursal */}
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>
						Sucursal:
					</Typography>
					<Typography variant="body2" gutterBottom>
						Dirección: Av. Falsa 123, Córdoba
					</Typography>
					<Typography variant="body2">
						Horario: Lunes a Viernes de 9 a 21hs.
					</Typography>
				</Grid>

				{/* Métodos de Pago */}
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>
						Métodos de Pago:
					</Typography>
					<Typography variant="body2" gutterBottom>
						Aceptamos los siguientes métodos de pago:
					</Typography>
					<Box
						sx={{
							display: "flex",
							gap: 2,
							justifyContent: { xs: "center", md: "flex-start" },
						}}
					>
						<FaCcVisa size={25} color="#fff" />
						<FaCcMastercard size={25} color="#fff" />
						<FaPaypal size={25} color="#fff" />
					</Box>
				</Grid>
			</Grid>
			<Typography
				variant="body2"
				sx={{ marginTop: "30px", textAlign: "center" }}
			>
				© 2024 TechLink. Todos los derechos reservados.
			</Typography>
		</Box>
	);
};

export default Footer;

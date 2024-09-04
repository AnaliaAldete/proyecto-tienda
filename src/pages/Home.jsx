import { Carrusel } from "../componentes/Carrusel";
import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import { FaTruck, FaRegCreditCard, FaCheck } from "react-icons/fa";

export const Home = () => {
	return (
		<Box
			sx={{
				backgroundColor: "#f5f5f5",
				display: "flex",
				flexDirection: "column",
				gap: { xs: 2, sm: 5 },
			}}
		>
			<Carrusel />
			<Grid container paddingInline={2} gap={2} justifyContent={"center"}>
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ display: "flex", justifyContent: "center" }}>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
							<FaTruck size={35} />
							<Box textAlign={"center"}>
								<Typography variant="h6" gutterBottom>
									Entrega gratis
								</Typography>
								<Typography variant="body2">A partir de $100.000</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
							<FaRegCreditCard size={35} />

							<Box textAlign={"center"}>
								<Typography variant="h6" gutterBottom>
									Cuotas sin interés
								</Typography>
								<Typography variant="body2">En seleccionados</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card sx={{ display: "flex", justifyContent: "center" }}>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
							<FaCheck size={35} />
							<Box textAlign={"center"}>
								<Typography variant="h6" gutterBottom>
									Compra Segura
								</Typography>
								<Typography variant="body2">Con garantía oficial</Typography>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

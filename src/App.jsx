import { ContainerProductos } from "./pages/Productos";
import { NavBar } from "./componentes/NavBar";
import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { NotFound } from "./pages/NotFound";
import { Ordenes } from "./pages/Ordenes";
import { CardDetalle } from "./pages/CardDetalle";
import { Checkout } from "./pages/Checkout";
import { Home } from "./pages/Home";
import { Footer } from "./componentes/Footer";
import { Box } from "@mui/material";

function App() {
	return (
		<>
			<NavBar />
			<Box
				component="main"
				sx={{
					backgroundColor: "#f5f5f5",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					paddingInline: { xs: "16px", sm: 0 },
					minHeight: "70vh",
				}}
			>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/Login" element={<Login />}></Route>
					<Route path="/Registro" element={<Registro />}></Route>
					<Route path="/Productos" element={<ContainerProductos />}></Route>
					<Route path="/Ordenes" element={<Ordenes />}></Route>
					<Route path="/CardDetalle/:id" element={<CardDetalle />}></Route>
					<Route path="/checkout" element={<Checkout />} />
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</Box>
			<Footer />
		</>
	);
}

export default App;

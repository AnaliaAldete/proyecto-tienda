import { ContainerProductos } from "./pages/Home";
import { NavBar } from "./componentes/NavBar";
import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { NotFound } from "./pages/NotFound";
import { Ordenes } from "./pages/Ordenes";
import { CardDetalle } from "./pages/CardDetalle";
import { Checkout } from "./pages/Checkout";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<ContainerProductos />}></Route>
				<Route path="/Login" element={<Login />}></Route>
				<Route path="/Registro" element={<Registro />}></Route>
				<Route path="/Productos" element={<ContainerProductos />}></Route>
				<Route path="/Ordenes" element={<Ordenes />}></Route>
				<Route path="/CardDetalle/:id" element={<CardDetalle />}></Route>
				<Route path="/checkout" element={<Checkout />} />
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</>
	);
}

export default App;

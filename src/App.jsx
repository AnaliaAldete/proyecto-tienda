import "./App.css";
import { ContainerProductos } from "./componentes/ContainerProductos";
import { NavBar } from "./componentes/NavBar";
import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { NotFound } from "./pages/NotFound";
import { Productos } from "./pages/Productos";
import { Ordenes } from "./pages/Ordenes";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<ContainerProductos />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/registro" element={<Registro />}></Route>
				<Route path="/productos" element={<Productos />}></Route>
				<Route path="/ordenes" element={<Ordenes />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</>
	);
}

export default App;

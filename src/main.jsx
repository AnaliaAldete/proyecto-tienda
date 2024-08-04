import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { OrderProvider } from "./context/OrderContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<OrderProvider>
			<React.StrictMode>
				<CssBaseline />
				<App />
			</React.StrictMode>
		</OrderProvider>
	</BrowserRouter>
);

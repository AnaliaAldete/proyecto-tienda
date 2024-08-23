import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	TextField,
	Button,
	Typography,
	Box,
	Container,
	Alert,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmit = (data) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, data.email, data.contraseña)
			.then((userCredential) => {
				const user = userCredential.user;
				navigate("/");
			})
			.catch((error) => {
				let message;

				if (error.code === "auth/invalid-credential") {
					message = "Usuario no registrado o contraseña incorrecta.";
				} else if (error.code === "auth/too-many-requests") {
					message =
						"El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos. Inténtalo de nuevo más tarde o restablece la contraseña.";
				} else {
					message = "Ocurrió un error inesperado. Inténtalo nuevamente.";
				}
				setErrorMessage(message);
			});
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				mt: 4,
				p: 3,
				border: "1px solid #ccc",
				borderRadius: "8px",
				backgroundColor: "#f9f9f9",
				textAlign: "center",
			}}
		>
			<Typography variant="h4" gutterBottom>
				Iniciar Sesión
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Box>
					<TextField
						label="Email"
						variant="outlined"
						margin="normal"
						fullWidth
						autoComplete="email"
						{...register("email", {
							required: "El email es obligatorio",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Formato de email inválido",
							},
						})}
						error={!!errors.email}
						helperText={errors.email ? errors.email.message : ""}
					/>
				</Box>
				<Box sx={{ mb: 2 }}>
					<TextField
						label="Contraseña"
						type="password"
						variant="outlined"
						margin="normal"
						fullWidth
						autoComplete="current-password"
						{...register("contraseña", {
							required: "La contraseña es obligatoria",
							minLength: {
								value: 6,
								message: "La contraseña debe tener al menos 6 caracteres",
							},
						})}
						error={!!errors.contraseña}
						helperText={errors.contraseña ? errors.contraseña.message : ""}
					/>
				</Box>
				{errorMessage && (
					<Alert severity="error" sx={{ mb: 4 }}>
						{errorMessage}
					</Alert>
				)}
				<Button type="submit" variant="contained" color="primary">
					INICIAR SESIÓN
				</Button>
				<Box sx={{ mt: 2 }}>
					<Typography variant="body2" align="center">
						¿Aún no tienes cuenta?{" "}
						<Link to="/registro" variant="body2">
							Regístrate aquí
						</Link>
					</Typography>
				</Box>
			</form>
		</Container>
	);
};

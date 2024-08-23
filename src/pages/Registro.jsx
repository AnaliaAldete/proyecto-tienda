import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	TextField,
	Button,
	Typography,
	Container,
	Box,
	Alert,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const Registro = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (event) => event.preventDefault();

	const onSubmit = (data) => {
		const auth = getAuth();

		const registroNuevoUsuario = async (nuevoUsuario) => {
			try {
				await setDoc(doc(db, "usuarios", nuevoUsuario.id), nuevoUsuario);
				navigate("/");
			} catch (err) {
				setErrorMessage("Ocurrió un error inesperado. Inténtalo nuevamente.");
			}
		};
		createUserWithEmailAndPassword(auth, data.email, data.contraseña)
			.then((userCredential) => {
				const usuario = {
					nombre: data.nombre,
					email: data.email,
					ordenes: [],
					carrito: [],
					id: userCredential.user.uid,
				};
				registroNuevoUsuario(usuario);
			})
			.catch((error) => {
				let message;
				if (error.code === "auth/email-already-in-use") {
					message = "El email ya está registrado. Por favor, inicia sesión.";
				} else if (error.code === "auth/too-many-requests") {
					message = "El registro de usuarios está deshabilitado.";
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
			<Typography variant="h4" component="h2" gutterBottom>
				Formulario de Registro
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Box>
					<TextField
						label="Nombre de Usuario"
						variant="outlined"
						fullWidth
						autoComplete="name"
						margin="normal"
						{...register("nombre", {
							required: "El nombre de usuario es requerido",
						})}
						error={!!errors.nombre}
						helperText={errors.nombre ? errors.nombre.message : ""}
					/>
				</Box>

				<Box>
					<TextField
						label="Correo Electrónico"
						name="email"
						variant="outlined"
						fullWidth
						autoComplete="email"
						margin="normal"
						{...register("email", {
							required: "El correo electrónico es requerido",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: "Correo electrónico inválido",
							},
						})}
						error={!!errors.email}
						helperText={errors.email ? errors.email.message : ""}
					/>
				</Box>

				<Box sx={{ mb: 2 }}>
					<TextField
						label="Contraseña"
						name="contraseña"
						type={showPassword ? "text" : "password"}
						variant="outlined"
						fullWidth
						autoComplete="new-password"
						margin="normal"
						{...register("contraseña", {
							required: "La contraseña es requerida",
							minLength: {
								value: 6,
								message: "La contraseña debe tener al menos 6 caracteres",
							},
						})}
						error={!!errors.contraseña}
						helperText={errors.contraseña ? errors.contraseña.message : ""}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Box>
				{errorMessage && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{errorMessage}
					</Alert>
				)}

				<Button type="submit" variant="contained" color="primary">
					Registrarse
				</Button>
			</form>
		</Container>
	);
};

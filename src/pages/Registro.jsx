import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const Registro = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = (data) => {
		const auth = getAuth();

		const registroNuevoUsuario = async (nuevoUsuario) => {
			try {
				await setDoc(doc(db, "usuarios", nuevoUsuario.id), nuevoUsuario);
			} catch (err) {
				console.log(err);
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
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(`Error ${errorCode}: ${errorMessage}`);
			});
	};

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					mt: 4,
					p: 3,
					border: "1px solid #ccc",
					borderRadius: "8px",
					backgroundColor: "#f9f9f9",
				}}
			>
				<Typography variant="h4" component="h2" align="center" gutterBottom>
					Formulario de Registro
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Box sx={{ mb: 2 }}>
						<TextField
							label="Nombre de Usuario"
							variant="outlined"
							fullWidth
							{...register("nombre", {
								required: "El nombre de usuario es requerido",
							})}
							error={!!errors.nombre}
							helperText={errors.nombre ? errors.nombre.message : ""}
						/>
					</Box>

					<Box sx={{ mb: 2 }}>
						<TextField
							label="Correo Electrónico"
							name="email"
							variant="outlined"
							fullWidth
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

					<Box sx={{ mb: 3 }}>
						<TextField
							label="Contraseña"
							name="contraseña"
							type="password"
							variant="outlined"
							fullWidth
							{...register("contraseña", {
								required: "La contraseña es requerida",
								minLength: {
									value: 6,
									message: "La contraseña debe tener al menos 6 caracteres",
								},
							})}
							error={!!errors.contraseña}
							helperText={errors.contraseña ? errors.contraseña.message : ""}
						/>
					</Box>

					<Button type="submit" variant="contained" color="primary" fullWidth>
						Registrarse
					</Button>
				</form>
			</Box>
		</Container>
	);
};

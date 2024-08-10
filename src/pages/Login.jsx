import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = (data) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, data.email, data.contraseña)
			.then((userCredential) => {
				const user = userCredential.user;
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("algo salio mal");
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
				<Typography variant="h4" gutterBottom>
					Iniciar Sesión
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Box sx={{ mb: 2 }}>
						<TextField
							label="Email"
							variant="outlined"
							margin="normal"
							fullWidth
							{...register("email", {
								required: "El email es obligatorio",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Formato de email inválido",
								},
							})}
							error={!!errors.email}
							helperText={errors.email ? errors.email.message : ""}
							InputProps={{
								autoComplete: "email",
							}}
						/>
					</Box>
					<Box sx={{ mb: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							variant="outlined"
							margin="normal"
							fullWidth
							{...register("contraseña", {
								required: "La contraseña es obligatoria",
								minLength: {
									value: 6,
									message: "La contraseña debe tener al menos 6 caracteres",
								},
							})}
							error={!!errors.contraseña}
							helperText={errors.contraseña ? errors.contraseña.message : ""}
							InputProps={{
								autoComplete: "current-password",
							}}
						/>
					</Box>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ mt: 2 }}
					>
						INICIAR SESIÓN
					</Button>
				</form>
			</Box>
		</Container>
	);
};

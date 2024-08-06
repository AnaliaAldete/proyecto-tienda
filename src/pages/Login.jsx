import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		// autenticación
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 2,
				maxWidth: "600px",
			}}
		>
			<Typography variant="h4" gutterBottom>
				Iniciar Sesión
			</Typography>
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
			/>
			<TextField
				label="Contraseña"
				type="password"
				variant="outlined"
				margin="normal"
				fullWidth
				{...register("password", {
					required: "La contraseña es obligatoria",
					minLength: {
						value: 6,
						message: "La contraseña debe tener al menos 6 caracteres",
					},
				})}
				error={!!errors.password}
				helperText={errors.password ? errors.password.message : ""}
			/>
			<Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
				Ingresar
			</Button>
		</Box>
	);
};

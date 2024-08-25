import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const Input = ({
	label,
	type,
	name,
	register,
	errors,
	showPassword,
	toggleShowPassword,
}) => {
	const handleMouseDownPassword = (event) => event.preventDefault();

	return (
		<TextField
			label={label}
			type={showPassword && type === "password" ? "text" : type}
			variant="outlined"
			fullWidth
			autoComplete={type === "password" ? "current-password" : "email"}
			margin="normal"
			{...register(name, {
				required: `${label} es requerido`,
				pattern: name === "email" && {
					value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
					message: "Formato de email inválido",
				},
				minLength: name === "contraseña" && {
					value: 6,
					message: "La contraseña debe tener al menos 6 caracteres",
				},
			})}
			error={!!errors[name]}
			helperText={errors[name]?.message}
			InputProps={{
				endAdornment: type === "password" && (
					<InputAdornment position="end">
						<IconButton
							aria-label={
								showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
							}
							onClick={toggleShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

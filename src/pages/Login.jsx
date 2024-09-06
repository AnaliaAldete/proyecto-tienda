import React from "react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRedireccion } from "../hooks/useRedireccion";
import { UserContext } from "../context/UserContext";
import { Button, Typography, Box, Container, Alert } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "../componentes/Spinner";
import { Input } from "../componentes/Input";

export const Login = () => {
	useRedireccion();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const { loading } = useContext(UserContext);

	const onSubmit = (data) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, data.email, data.contraseña)
			.then(() => {
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
	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
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
						<Input
							label="Email"
							type="email"
							name="email"
							register={register}
							errors={errors}
						/>

						<Input
							label="Contraseña"
							type="password"
							name="contraseña"
							register={register}
							errors={errors}
							showPassword={showPassword}
							toggleShowPassword={() => setShowPassword(!showPassword)}
						/>

						{errorMessage && (
							<Alert severity="error" sx={{ mt: 2 }}>
								{errorMessage}
							</Alert>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{ mt: 2 }}
						>
							INICIAR SESIÓN
						</Button>
						<Box sx={{ mt: 2 }}>
							<Typography variant="body2" align="center">
								¿Aún no tienes cuenta?{" "}
								<Link to="/registro">Regístrate aquí</Link>
							</Typography>
						</Box>
					</form>
				</Container>
			)}
		</>
	);
};

import React from "react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRedireccion } from "../hooks/useRedireccion";
import { UserContext } from "../context/UserContext";
import { Button, Typography, Container, Alert } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Spinner } from "../componentes/Spinner";
import { Input } from "../componentes/Input";

export const Registro = () => {
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

	const onSubmit = async (data) => {
		const auth = getAuth();

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.contraseña
			);

			const usuario = {
				nombre: data.nombre,
				email: data.email,
				ordenes: [],
				carrito: [],
				id: userCredential.user.uid,
			};

			await setDoc(doc(db, "usuarios", usuario.id), usuario);
			navigate("/");
		} catch (error) {
			let message;
			if (error.code === "auth/email-already-in-use") {
				message = "El email ya está registrado. Por favor, inicia sesión.";
			} else if (error.code === "auth/too-many-requests") {
				message = "El registro de usuarios está deshabilitado.";
			} else {
				message = "Ocurrió un error inesperado. Inténtalo nuevamente.";
			}
			setErrorMessage(message);
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<Container
					maxWidth="sm"
					sx={{
						marginBlock: { xs: "30px", sm: "50px" },
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
						<Input
							label="Nombre de Usuario"
							name="nombre"
							type="text"
							register={register}
							errors={errors}
						/>

						<Input
							label="Correo Electrónico"
							name="email"
							type="email"
							register={register}
							errors={errors}
						/>

						<Input
							label="Contraseña"
							name="contraseña"
							type="password"
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
							sx={{ mt: 2, backgroundColor: "#0000FF" }}
						>
							Registrarse
						</Button>
					</form>
				</Container>
			)}
		</>
	);
};

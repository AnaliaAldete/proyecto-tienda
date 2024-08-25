import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const useRedireccion = () => {
	const { usuario, loading } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && usuario) {
			navigate("/");
		}
	}, [loading, usuario, navigate]);
};

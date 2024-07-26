import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";

export const ContainerProductos = () => {
	useEffect(() => {
		const getProductos = async () => {
			const collectionReference = collection(db, "productos");
			const data = await getDocs(collectionReference);
			console.log(data);
		};
		getProductos();
	}, []);

	return <div>hola</div>;
};

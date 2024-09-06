import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [usuario, setUsuario] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();

	const getInfoUsuario = async (uid) => {
		try {
			const docRef = doc(db, "usuarios", uid);
			const document = await getDoc(docRef);
			return document.data();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const isAuth = () => {
			onAuthStateChanged(auth, async (user) => {
				try {
					if (user) {
						const uid = user.uid;
						const userInfo = await getInfoUsuario(uid);
						setUsuario(userInfo);
					} else {
						setUsuario(null);
					}
				} catch (error) {
					setUsuario(null);
				} finally {
					setLoading(false);
				}
			});
		};
		isAuth();
	}, []);

	return (
		<UserContext.Provider value={{ usuario, loading }}>
			{children}
		</UserContext.Provider>
	);
};

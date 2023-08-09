import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSession } from "../middlewares/ProtectedRoutes";


const Success = () => {

	const navigate = useNavigate();

	const { token } = useParams()
	console.log(token);

	const saveUserOnLocalStorage = () => {
		localStorage.setItem("userLoggedIn", JSON.stringify(token))
	};

	const session = useSession();
	console.log(session);

	useEffect(() => {
		if (token) {
			saveUserOnLocalStorage(token);
			navigate(`/success/${token}`);
			setTimeout(() => {
				navigate('/homepage')
			}, 5000)
		}
	},[token, navigate])

	return(
		<>
			{session ? <div>Benvenuto {session.username} </div> : <div> Github Login error </div>}
		</>
	)
};

export default Success;
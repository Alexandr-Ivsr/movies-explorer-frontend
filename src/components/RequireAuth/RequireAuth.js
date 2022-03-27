import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({component: Component, ...props}) {
	return props.loggedIn ? <Component {...props} /> : <Navigate to="/" />
}
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../contexts';

const ProtectedRoute = ({ children }) => {
	let { userDetails } = useAuthState();
	const location = useLocation();

	if (!userDetails) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;

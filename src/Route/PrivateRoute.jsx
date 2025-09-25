import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return <span className='loading loading-spinner'></span>
	}

	if (!user) {
		return <Navigate  to={'/login'} state={{from: location.pathname}} ></Navigate>
	}



	return children;
};

export default PrivateRoute;


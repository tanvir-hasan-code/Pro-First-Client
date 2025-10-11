import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../LoadingPage/LoadingPage';

const PrivateRoute = ({children}) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return <LoadingPage/>
	}

	if (!user) {
		return <Navigate  to={'/login'} state={{from: location.pathname}} ></Navigate>
	}



	return children;
};

export default PrivateRoute;


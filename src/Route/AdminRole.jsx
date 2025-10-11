import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Navigate } from 'react-router';

const AdminRole = ({children}) => {

	const { user, loading } = useAuth();
	const { role, isLoading} = useUserRole();

	if (loading || isLoading) {
		return <LoadingPage/>
	}

	if (!user || role !== "admin") {
		return <Navigate  to={'/forbidden'} state={{from: location.pathname}} ></Navigate>
	}


	return children;
};

export default AdminRole;
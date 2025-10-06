import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const MyProfile = () => {
	const { user } = useAuth();
	return (
		<div>
			<img src={user?.photoURL} alt="profile_image" className="mx-auto my-4 rounded-full" />
			<h1 className='font-bold text-2xl text-center'>{user?.displayName}</h1>
			<p className='text-blue-600 text-center'>{user?.email}</p>
		</div>
	);
};

export default MyProfile;
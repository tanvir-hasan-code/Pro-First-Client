import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../HomeComponents/HowItWorks/HowItWorks';
import Services from '../../HomeComponents/OurServices/Services/Services';
import useTitle from '../../../Hooks/useTitle';

const Home = () => {
	useTitle("Home")
	return (
		<div>
			<Banner />
			<HowItWorks/>
			<Services/>
		</div>
	);
};

export default Home;
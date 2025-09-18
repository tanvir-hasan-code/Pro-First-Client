import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../HomeComponents/HowItWorks/HowItWorks';
import Services from '../../HomeComponents/OurServices/Services/Services';

const Home = () => {
	return (
		<div>
			<Banner />
			<HowItWorks/>
			<Services/>
		</div>
	);
};

export default Home;
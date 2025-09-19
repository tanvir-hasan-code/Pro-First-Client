import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../HomeComponents/HowItWorks/HowItWorks';
import Services from '../../HomeComponents/OurServices/Services/Services';
import useTitle from '../../../Hooks/useTitle';
import SalesTeamSection from '../../HomeComponents/SalesTeamSection/SalesTeamSection';
import FeatureCards from '../../HomeComponents/FeatureCard/FeatureCard';

const Home = () => {
	useTitle("Home")
	return (
		<div>
			<Banner />
			<HowItWorks/>
			<Services/>
			<SalesTeamSection />
			<FeatureCards/>
		</div>
	);
};

export default Home;
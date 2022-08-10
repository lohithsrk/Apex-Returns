import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { getApexPlans } from '../axios/apexPlans.axios';

import LOGO from '../assets/logo-colored.png';

const Plans = () => {
	const [apexPlans, setApexPlans] = useState([]);

	useEffect(() => {
		getApexPlans().then((res) => setApexPlans(res.data));
	}, []);
	return (
		<>
			<Helmet>
				<title>PLANS | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='flex justify-between items-center text-xs text-center h-16 shadow-md'>
					<img src={LOGO} alt='APEX RETURNS' className='w-16 ml-2' />
					<div className='flex justify-center items-center'>
						<div className='p-2'>
							<p>
								Obtained <br /> Already
							</p>
							<p>₹0.00</p>
						</div>
						<span className='w-[2px] block h-4 bg-gray-600' />
						<div className='p-2'>
							<p>
								Current <br /> Daily Returns
							</p>
							<p>₹0.00</p>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</>
	);
};

export default Plans;

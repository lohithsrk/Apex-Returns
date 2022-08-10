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
				<div>
					{apexPlans.map((plan, index) => {
						return (<>
								<div className='bg-white p-5 w-64 rounded-lg shadow-md shadow-slate-500'>
									<h2 className='font-semibold text-xl text-center pb-2'>
										Apex Returns
									</h2>
									<p className='text-lg font-medium text-[#5271ff] pb-2'>
										{'basic'} plan
									</p>
									<div className='flex justify-between pb-2'>
										<span>Deposite amount</span>
										<span>{choosenPlan.deposit_amount}</span>
									</div>
									<div className='flex justify-between pb-2'>
										<span>Daily returns</span>
										<span>{choosenPlan.daily_returns}</span>
									</div>
									<div className='flex justify-between pb-2'>
										<span>Return period</span>
										<span>{choosenPlan.return_period}</span>
									</div>
									<div className='flex justify-between pb-2'>
										<span>Total returns</span>
										<span>{choosenPlan.total_return}</span>
									</div>
									<div
										className='w-full p-2 mt-2 text-center text-white bg-gradient-to-l from-cyan-500 to-[#5271ff] rounded'
										onClick={() =>
											handleInvest(
												user.user.id,
												choosenPlan.id,
												choosenPlan.deposit_amount
											)
										}
									>
										INVEST
									</div>
								</div>
							</div>
						);
					})}
				</div>
		</>
	);
};

export default Plans;

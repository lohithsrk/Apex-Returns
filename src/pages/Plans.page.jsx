import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { getUserApexPlans } from '../axios/apexPlans.axios';

import LOGO from '../assets/logo_full_white.png';

const Plans = () => {
	const [apexPlans, setApexPlans] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getUserApexPlans(user.user.id).then((res) => {
			setApexPlans(res.data);
		});
	}, [user.user.id]);
	return (
		<>
			<Helmet>
				<title>PLANS | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='flex justify-between items-center text-xs text-center h-16 shadow-md bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white'>
					<img src={LOGO} alt='APEX RETURNS' className='w-36 ml-2' />
					<div className='flex justify-center items-center'>
						<div className='p-2'>
							<p>
								Obtained <br /> Already
							</p>
							<p>
								₹
								{user.user.amountObtainedAlready
									? user.user.amountObtainedAlready.toFixed(2)
									: 0}
							</p>
						</div>
						<span className='w-[2px] block h-4 bg-gray-600' />
						<div className='p-2'>
							<p>
								Current <br /> Daily Returns
							</p>
							<p>
								₹
								{user.user.currentDailyReturns
									? user.user.currentDailyReturns.toFixed(2)
									: 0}
							</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center pb-20'>
					{apexPlans.length > 0 ? (
						apexPlans
							.sort(function (a, b) {
								// Turn your strings into dates, and then subtract them
								// to get a value that is either negative, positive, or zero.
								return new Date(b.created_at) - new Date(a.created_at);
							})
							.reverse()
							.map((plan, index) => {
								return (
									<>
										<div className='bg-white p-5 w-64 rounded-lg shadow-md shadow-slate-500 mt-10 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white'>
											<h2 className='font-semibold text-xl text-center pb-2'>
												{plan.name}
											</h2>
											<div className='flex justify-between pb-2'>
												<span>deposit amount</span>
												<span>₹{plan.deposit_amount}</span>
											</div>
											<div className='flex justify-between pb-2'>
												<span>Daily returns</span>
												<span>{plan.daily_returns}%</span>
											</div>
											<div className='flex justify-between pb-2'>
												<span>Return period</span>
												<span>{plan.return_period} Days</span>
											</div>
											<div className='flex justify-between pb-2'>
												<span>Total returns</span>
												<span>₹{plan.total_return}</span>
											</div>
										</div>
									</>
								);
							})
					) : (
						<div className='flex justify-center items-center'>
							<div className='p-2'>
								<p>No plans found</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Plans;

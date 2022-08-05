import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { getApexPlans } from '../axios/apexPlans.axios';
import { investmentPost } from '../axios/investments.axios';

const Home = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [apexPlans, setApexPlans] = useState([]);
	const [isConfirmOpened, setIsConfirmOpened] = useState(false);
	const [choosenPlan, setChoosenPlan] = useState({});

	useEffect(() => {
		getApexPlans().then((res) => setApexPlans(res.data));
	}, []);

	const percentage = (daily_returns, return_period, deposit_amount) =>
		(daily_returns * return_period) / deposit_amount;

	return (
		<>
			<Helmet>
				<title>HOME | APEX RETURNS</title>
			</Helmet>
			<div className='flex justify-end items-center text-xs text-center h-16'>
				<div className='p-2'>
					<p>Apex</p>
					<p>{user.user.total_apex ? user.user.total_apex : 0}</p>
				</div>
				<span className='w-[2px] block h-4 bg-gray-600' />
				<div className='p-2'>
					<p>Balance</p>
					<p>₹{user.user.total_apex ? user.user.total_apex : '0.00'}</p>
				</div>
			</div>
			<div className='flex flex-1 w-screen h-screen bg-gradient-to-l from-cyan-500 to-[#5271ff] pb-20'>
				<div className='flex flex-col items-center w-screen'>
					{apexPlans.map((plan, index) => {
						return (
							<div
								className='bg-white bg-opacity-20 backdrop-blur-md p-4  rounded-lg w-5/6 m-5 shadow-lg'
								key={index}
							>
								<div className='flex bg-gradient-to-l from-cyan-500 to-[#5271ff] p-2 rounded-lg text-white text-center items-center justify-between w-full'>
									<div>APEX RETURNS</div>
									<div className='flex'>
										<h3>{plan.name}</h3>
										<span>|</span>
										<h3>
											Total &nbsp;
											{percentage(
												plan.daily_returns,
												plan.return_period,
												plan.deposit_amount
											)}
											%
										</h3>
									</div>
								</div>
								<div className='flex w-full items-center justify-between p-2 text-white'>
									<div className='text-left'>
										<div>
											<p>Deposit Amount</p>
											<p>{plan.deposit_amount}</p>
										</div>
										<div>
											<p>Return Period</p>
											<p>{plan.return_period}</p>
										</div>
									</div>
									<div className='text-right'>
										<div>
											<p>Daily Returns</p>
											<p>{plan.daily_returns}</p>
										</div>
										<div>
											<p>Total Returns</p>
											<p>{plan.total_return}</p>
										</div>
									</div>
								</div>
								<div
									className='bg-gradient-to-l from-cyan-500 to-[#5271ff] p-2 rounded-lg text-white text-center'
									onClick={() => {
										setChoosenPlan(plan);
										setIsConfirmOpened(true);
									}}
								>
									{plan.deposit_amount} Apex
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{isConfirmOpened && (
				<InvestConfirm
					setIsConfirmOpened={setIsConfirmOpened}
					choosenPlan={choosenPlan}
					setChoosenPlan={setChoosenPlan}
					percentage={percentage}
					user={user}
					dispatch={dispatch}
					navigate={navigate}
				/>
			)}
		</>
	);
};

const InvestConfirm = ({
	setIsConfirmOpened,
	choosenPlan,
	setChoosenPlan,
	user,
	dispatch,
	navigate
}) => {
	const handleInvest = async (investment_id, user_id, amount) => {
		if (user.user.total_apex < amount) {
			navigate('/deposite');
			return toast.error(
				'You do not have enough Apex to invest. Buy some here.'
			);
		}
		await investmentPost(investment_id, user_id, amount).then((res) => {
			dispatch({
				type: 'SET_USER',
				payload: {
					token: user.token,
					isLoggedIn: true,
					user: { ...res.data.user, total_apex: res.data.total_apex - amount }
				}
			});
		});
	};
	return (
		<div
			className='absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center'
			onClick={() => {
				setIsConfirmOpened(false);
				setChoosenPlan({});
			}}
		>
			<div className='bg-white p-5 w-64 rounded-lg shadow-md shadow-slate-500'>
				<h2 className='font-semibold text-xl text-center pb-2'>Apex Returns</h2>
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
					className='w-full p-2 mt-2 text-center text-white bg-[#5271ff] rounded'
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
};

export default Home;

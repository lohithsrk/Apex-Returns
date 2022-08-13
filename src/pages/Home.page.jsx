import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { getApexPlans } from '../axios/apexPlans.axios';
import { investmentPost } from '../axios/investments.axios';

import LOGO from '../assets/logo_full_white.png';
import Slide1 from '../assets/slide1.svg';
import Slide2 from '../assets/slide2.svg';
import Slide3 from '../assets/slide3.svg';
import Slide4 from '../assets/slide4.svg';
import CheckListArrow from '../assets/CheckListArrow.svg';

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
			<div className='flex justify-between items-center text-xs text-center h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white'>
				<img src={LOGO} alt='APEX RETURNS' className='w-36 ml-2' />
				<div className='flex items-center justify-center'>
					<div className='p-2'>
						<p>Apex</p>
						<p>{user.user.total_apex > 0 ? user.user.total_apex : 0}</p>
					</div>
					<span className='w-[2px] block h-4 bg-white' />
					<div className='p-2'>
						<p>Balance</p>
						<p>₹{user.user.amount > 0 ? user.user.amount : '0.00'}</p>
					</div>
				</div>
			</div>
			<div className='pb-20'>
				<div className='flex flex-col flex-1 items-center w-screen'>
					<Swiper
						slidesPerView={1}
						centeredSlides={true}
						spaceBetween={30}
						grabCursor={true}
						className='mySwiper bg-transparent'
						pagination={{
							clickable: true
						}}
						modules={[Pagination]}
					>
						<SwiperSlide>
							<div className='px-6 pb-3 pt-16 mt-3 shadow-lg w-72 text-left rounded-lg relative'>
								<img
									src={Slide1}
									alt='Slide 1'
									className='w-28 absolute top-0 -translate-y-1/2'
								/>
								<h1 className='font-medium text-xl'>Leases</h1>
								<ul>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Asset Backed
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Corporate Credit
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Monthly Returns, 24-36 Months Tenure
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Invest from ₹ 500
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Up to 10% Yield
									</li>
								</ul>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className='px-6 pb-3 pt-16 mt-3 shadow-lg w-72 text-left rounded-lg relative'>
								<img
									src={Slide2}
									alt='Slide 1'
									className='w-28 absolute top-0 -translate-y-1/2'
								/>
								<h1 className='font-medium text-xl'>Inventory</h1>
								<ul>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Asset Backed
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Corporate Credit
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										1-13 Months Tenure
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Invest from ₹ 500
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Up to 10% Yield
									</li>
								</ul>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className='px-6 pb-3 pt-16 mt-3 shadow-lg w-72 text-left rounded-lg relative '>
								<img
									src={Slide3}
									alt='Slide 3'
									className='w-28 absolute top-0 -translate-y-1/2'
								/>
								<h1 className='font-medium text-xl'>Commercial Real-Estate</h1>
								<ul>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Asset Backed
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										MNC Tenants
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Quaterly Rentals
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Invest from ₹ 500
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Up to 10% Yield
									</li>
								</ul>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className='px-6 pb-3 pt-16 mt-3 shadow-lg w-72 text-left rounded-lg relative'>
								<img
									src={Slide4}
									alt='Slide 4'
									className='w-28 absolute top-0 -translate-y-1/2'
								/>
								<h1 className='font-medium text-xl'>Start-up Equity</h1>
								<ul>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										High-Growth, Early-Stage companies
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Participate along side VCs
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Long Term Investment Horizon
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										Invest from ₹ 500
									</li>
									<li className='items-center flex my-2 text-base'>
										<img
											src={CheckListArrow}
											className='mr-4 w-4'
											alt='Check'
										/>
										High risk-high-reward
									</li>
								</ul>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>

				<h1 className='text-xl font-semibold text-center mt-5'>
					Plans you can invest
				</h1>
				<div className='flex flex-col items-center w-screen'>
					{apexPlans
						.sort(function (a, b) {
							// Turn your strings into dates, and then subtract them
							// to get a value that is either negative, positive, or zero.
							return new Date(b.created_at) - new Date(a.created_at);
						})
						.reverse()
						.map((plan, index) => {
							return (
								<div
									className='bg-gradient-to-l from-cyan-500 to-[#5271ff]  bg-opacity-20 backdrop-blur-md p-4  rounded-lg w-5/6 m-5 shadow-lg'
									key={index}
								>
									<div className='flex bg-gradient-to-l from-cyan-500 to-[#5271ff] p-2 rounded-lg text-white text-center items-center justify-between w-full'>
										<div className='flex justify-between w-full'>
											<div>APEX RETURNS</div>
											<h3>{plan.name}</h3>
										</div>
									</div>
									<div className='flex w-full items-center justify-between p-2 text-white'>
										<div className='text-left'>
											<div>
												<p>Deposit Amount</p>
												<p>₹{plan.deposit_amount}</p>
											</div>
											<div>
												<p>Return Period</p>
												<p>{plan.return_period} Days</p>
											</div>
										</div>
										<div className='text-right'>
											<div>
												<p>Daily Returns</p>
												<p>{plan.daily_returns}%</p>
											</div>
											<div>
												<p>Total Returns</p>
												<p>₹{plan.total_return}</p>
											</div>
										</div>
									</div>
									<div
										className='bg-white text-[#5271ff] p-2 rounded-lg font-semibold text-center'
										onClick={() => {
											setChoosenPlan(plan);
											setIsConfirmOpened(true);
										}}
									>
										{plan.deposit_amount} APEX
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
	const handleInvest = async (investment_id, user_id, amount, reference_id) => {
		if (user.user.total_apex < amount) {
			navigate('/deposit');
			return toast.error(
				'You do not have enough Apex to invest. Buy some here.'
			);
		}
		await investmentPost(investment_id, user_id, amount, reference_id)
			.then((res) => {
				toast.success('Investment successful');
				dispatch({
					type: 'SET_USER',
					payload: {
						token: user.token,
						isLoggedIn: true,
						user: {
							...res.data.user,
							total_apex: res.data.user.total_apex - amount
						}
					}
				});
				navigate('/plans');
			})
			.catch((err) => {
				return toast.error(err.response.data);
			});
	};
	return (
		<div
			className='fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center'
			onClick={() => {
				setIsConfirmOpened(false);
				setChoosenPlan({});
			}}
		>
			<div className='bg-white p-5 w-64 rounded-lg shadow-md shadow-slate-500'>
				<h2 className='font-semibold text-xl text-center pb-2'>Apex Returns</h2>
				<p className='text-lg font-medium text-[#5271ff] pb-2'>
					{choosenPlan.name}
				</p>
				<div className='flex justify-between pb-2'>
					<span>deposit amount</span>
					<span>{choosenPlan.deposit_amount}</span>
				</div>
				<div className='flex justify-between pb-2'>
					<span>Daily returns</span>
					<span>{choosenPlan.daily_returns}%</span>
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
							choosenPlan.deposit_amount,
							user.user.reference_id
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

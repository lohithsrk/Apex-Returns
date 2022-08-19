import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

import LOGO from '../assets/logo-colored.png';
import LOGO_FULL from '../assets/logo_full_white.png';

import { referGet } from '../axios/reference.axios';

const Me = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [refer, setRefer] = useState({});
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		referGet(user.user.id).then((res) => setRefer(res.data));
	}, []);

	return (
		<>
			<Helmet>
				<title>ME | APEX RETURNS</title>
			</Helmet>
			<div>
			<div className='flex justify-between items-center text-xs text-center h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white'>
				<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36 ml-2' />
				<div className='flex items-center justify-center'>
					<div className='p-2'>
						<p>Apex</p>
						<p>{user.user.total_apex > 0 ? user.user.total_apex : 0}</p>
					</div>
					<span className='w-[2px] block h-4 bg-white'  />
					<div className='p-2'>
						<p>Balance</p>
						<p>₹{user.user.amount > 0 ? user.user.amount.toFixed(2) : '0.00'}</p>
					</div>
				</div>
			</div>
				<div className='bg-gradient-to-l from-cyan-500 to-[#5271ff] flex justify-end px-2 py-1 mt-[1px]'>
					<p className='inline text-white text-sm'>My ID: {user.user.id}</p>
				</div>
				<div className='grid grid-cols-3'>
					{buttonDatas.map((buttonData, index) => (
						<Buttons
							key={index}
							img={buttonData.img}
							text={buttonData.text}
							dispatch={dispatch}
							navigate={navigate}
							link={buttonData.link ? buttonData.link : null}
						/>
					))}
				</div>
				<div className='flex justify-between items-center text-xs p-2 bg-gray-100'>
					<h2>Refer your friends and get rewarded of ₹50</h2>
					<RWebShare
						data={{
							text: `Use this referal id to get ₹50 as reward "${user.user.id}"`,
							url: 'https://apexreturns.com/',
							title: 'Apex Returns'
						}}
					>
						<button className='text-white bg-[#5271ff] rounded px-4 py-2 h-fit'>
							Refer
						</button>
					</RWebShare>
				</div>
				<div className='flex justify-between p-2'>
					<div className='flex items-center justify-center flex-col p-3 rounded shadow-md w-1/2 mr-1'>
						<p className='text-xs font-medium text-gray-400'>TOTAL REFERRALS</p>
						<h1 className='text-[#5271ff] font-bold text-2xl'>
							{refer.total_referrals ? refer.total_referrals : 0}
						</h1>
					</div>
					<div className='flex items-center justify-center flex-col p-3 rounded shadow-md w-1/2 ml-1'>
						<p className='text-xs font-medium text-gray-400'>TOTAL REWARDS</p>
						<h1 className='text-[#5271ff] font-bold text-2xl'>
							₹{refer.total_rewards ? refer.total_rewards : 0}
						</h1>
					</div>
				</div>
			</div>
		</>
	);
};

const handleMeNav = (text, dispatch, navigate, link) => {
	switch (text) {
		case 'Logout':
			toast.success('Logged out');
			dispatch({
				type: 'SET_USER',
				payload: null
			});
			navigate('/login');
			break;
		case 'Orders':
			navigate(link);
			break;
		case 'Withdraw':
			navigate(link);
			break;
		case 'Team':
			navigate(link);
			break;
		case 'Customer Support':
			window.open(link);
			break;
		case 'About us':
			navigate(link);
			break;
		case 'Deposite':
			navigate(link);
			break;
		case 'Referral':
			navigate(link);
			break;

		default:
			break;
	}
};

const Buttons = ({ img, text, dispatch, navigate, link }) => {
	return (
		<div
			className='flex items-center flex-col text-center m-2'
			onClick={() => handleMeNav(text, dispatch, navigate, link)}
		>
			<img className='w-12' src={img} alt={text} />
			<p className='w-20 text-sm text-center'>{text}</p>
		</div>
	);
};

const buttonDatas = [
	{
		img: LOGO,
		text: 'Deposite',
		link: '/deposit'
	},
	// {
	// 	img: 'https://img.icons8.com/fluency/96/000000/share--v2.png',
	// 	text: 'Refer a friend'
	// },
	{
		img: 'https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-withdraw-business-and-finance-anggara-flat-anggara-putra-2.png',
		text: 'Withdraw',
		link: '/withdraw'
	},
	// {
	// 	img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
	// 	text: 'Add a bank account'
	// },
	// {
	// 	img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
	// 	text: 'Payment issues'
	// },
	// {
	// 	img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
	// 	text: 'Balance records'
	// },
	// {
	// 	img: 'https://img.icons8.com/ios/50/000000/rupee.png',
	// 	text: 'Apex records'
	// },
	{
		img: 'https://img.icons8.com/material-rounded/48/5271ff/paid-bill.png',
		text: 'Orders',
		link: '/orders'
	},
	// {
	// 	img: 'https://img.icons8.com/material-rounded/48/5271ff/paid-bill.png',
	// 	text: 'Team',
	// 	link: '/team'
	// },
	{
		img: 'https://img.icons8.com/fluency/96/000000/chat-message.png',
		text: 'Customer Support',
		link: 'https://t.me/+5eEEx9yt2lAxMmU1'
	},
	{
		img: 'https://img.icons8.com/fluency/96/000000/about.png',
		text: 'About us',
		link: '/about'
	},
	// {
	// 	img: 'https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-network-business-and-management-kiranshastry-gradient-kiranshastry.png',
	// 	text: 'Referral',
	// 	link: '/referral'
	// },
	{
		img: 'https://img.icons8.com/external-regular-kawalan-studio/96/5271ff/external-logout-user-interface-regular-kawalan-studio.png',
		text: 'Logout'
	}
];

export default Me;

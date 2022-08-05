import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import logo from '../assets/logo-colored.png';

const Me = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<>
			<Helmet>
				<title>ME | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='p-3 h-16'>Logo</div>
				<div className='bg-[#5271ff] flex justify-end px-2'>
					<p className='inline'>My ID: {user.id}</p>
				</div>
				<div className='grid grid-cols-3'>
					{buttonDatas.map((buttonData, index) => (
						<Buttons
							key={index}
							img={buttonData.img}
							text={buttonData.text}
							dispatch={dispatch}
						/>
					))}
				</div>
			</div>
		</>
	);
};

const handleMeNav = (text, dispatch) => {
	switch (text) {
		case 'Logout':
			toast.success('Logged out');
			dispatch({
				type: 'SET_USER',
				payload: null
			});
			break;
		default:
			break;
	}
};

const Buttons = ({ img, text, dispatch }) => {
	return (
		<div
			className='flex items-center flex-col text-center m-2'
			onClick={() => handleMeNav(text, dispatch)}
		>
			<img className='w-12' src={img} alt={text} />
			<p className='w-20 text-sm text-center'>{text}</p>
		</div>
	);
};

const buttonDatas = [
	{
		img: logo,
		text: 'Buy Apex'
	},
	{
		img: 'https://img.icons8.com/fluency/96/000000/share--v2.png',
		text: 'Refer a friend'
	},
	{
		img: 'https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-withdraw-business-and-finance-anggara-flat-anggara-putra-2.png',
		text: 'Withdraw'
	},
	{
		img: 'https://img.icons8.com/fluency-systems-regular/48//quick-mode-on.png',
		text: 'Deposit'
	},
	{
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
		text: 'Add a bank account'
	},
	{
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
		text: 'Payment issues'
	},
	{
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
		text: 'Balance records'
	},
	{
		img: 'https://img.icons8.com/ios/50/000000/rupee.png',
		text: 'Apex records'
	},
	{
		img: 'https://img.icons8.com/material-rounded/48/5271ff/paid-bill.png',
		text: 'Orders'
	},
	{
		img: 'https://img.icons8.com/fluency/96/000000/chat-message.png',
		text: 'Customer support'
	},
	{
		img: 'https://img.icons8.com/fluency/96/000000/about.png',
		text: 'About us'
	},
	{
		img: 'https://img.icons8.com/ios-filled/100/000000/guest-male--v1.png'
	},
	{
		img: 'https://img.icons8.com/external-regular-kawalan-studio/96/000000/external-logout-user-interface-regular-kawalan-studio.png',
		text: 'Logout'
	}
];

export default Me;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Me = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<div>
			<div className='p-3 h-16'>Logo</div>
			<div className='bg-blue-400 flex justify-end px-2'>
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
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
		text: 'Buy Apex'
	},
	{
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
		text: 'Refer a friend'
	},
	{
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
		text: 'Withdraw'
	},
	{
		img: 'https://img.icons8.com/emoji/48/000000/basketball-emoji.png',
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

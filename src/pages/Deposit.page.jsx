import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { UIPGet } from '../axios/admin.axios';

import LOGO_COLORED from '../assets/logo-colored.png';
import LOGO from '../assets/logo.png';
import LOGONav from '../assets/logo_full_white.png';

const Deposit = () => {
	const [selectedApex, setSelectedApex] = useState(0);
	const [customApex, setCustomApex] = useState('');
	const [UPI_ID, setUPI_ID] = useState('');

	const { user } = useSelector((state) => ({ ...state }));

	const navigate = useNavigate();

	useEffect(() => {
		UIPGet().then((res) => {
			setUPI_ID(res.data);
		});
	}, []);

	const handleAddApexClick = (amount) => {
		if (selectedApex < 500) {
			return toast.error('Please select an apex of 500 or more');
		}

		const paymentLink = `upi://pay?pn=Eagle%20Alpha&pa=${UPI_ID}&cu=INR&am=${amount}/`;
		// upi://pay/?pa=maypay.MyPay983877@icici&pn=Eagle%20Alpha&tn=&am=%27500%27&cu=INR

		window.location = paymentLink;
		const qr = 'https://upayi.ml/qr/' + UPI_ID + '/' + amount;

		navigate('/deposit/apex/payment', {
			state: {
				UPI_ID: UPI_ID,
				amount: selectedApex,
				paymentLink,
				qr,
				user
			}
		});
	};

	return (
		<>
			<Helmet>
				<title>BUY APEX | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='flex justify-between items-center text-xs text-center h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white border-b-2 border-white'>
					<img src={LOGONav} alt='APEX RETURNS' className='w-36 ml-2' />
					<div className='flex justify-center items-center'>
						<div className='p-2'>
							<p>Apex</p>
							<p>{user.user.total_apex > 0 ? user.user.total_apex : '0.00'}</p>
						</div>
						<span className='w-[2px] block h-4 bg-gray-600' />
						<div className='p-2'>
							<p>Balance</p>
							<p>₹{user.user.amount > 0 ? user.user.amount : '0.00'}</p>
						</div>
					</div>
				</div>
				<div className='bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white text-xs p-3'>
					All investment plans at ApexReturns can only be purchased with Apex.
					Please click on any of packages below to buy some tickets first before
					you invest:
				</div>
				<div className='grid grid-cols-3 sm:grid-cols-2 w-full h-full p-2'>
					{data.map((apex, index) => {
						return (
							<ApexsAmount
								key={index}
								apex={apex}
								selected={apex === selectedApex}
								setSelectedApex={setSelectedApex}
								setCustomApex={setCustomApex}
							/>
						);
					})}
					{/* <div
						className={`flex flex-row items-center justify-start p-3 m-2 shadow-lg rounded-md cursor-pointer ${
							selectedApex === 'custom' &&
							'bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white'
						}`}
						onClick={() => setSelectedApex('custom')}
					>
						<img
							src={selectedApex === 'custom' ? LOGO : LOGO_COLORED}
							alt='Apex'
							className='w-5 h-5 mr-1'
						/>
						<p>Amount</p>
					</div> */}
				</div>
				<div className='flex flex-1 justify-between mx-3 text-sm mb-3'>
					<p>Enter Apex:</p>
					<input
						type='text'
						className='border-b-2 border-[#5271ff] w-14 outline-none text-right'
						placeholder='00000'
						value={customApex}
						onInput={(e) => {
							setCustomApex(e.target.value.replace(/[^0-9]/g, ''));
							setSelectedApex(e.target.value.replace(/[^0-9]/g, ''));
						}}
						onPaste={() => false}
						maxLength={7}
						minLength={3}
					/>
				</div>
				<div className='flex flex-1 justify-between mx-3 text-sm '>
					<p>Deposit amount:</p>
					<p>₹{customApex ? customApex : 0}</p>
				</div>
				<div
					className='p-2 bg-gradient-to-l from-cyan-500 to-[#5271ff] m-3 rounded-lg text-white text-center'
					onClick={() => handleAddApexClick(selectedApex)}
				>
					Deposite
				</div>
				{/* <p className='underline text-center text-xs text-[#5271ff]'>Get help</p> */}
			</div>
		</>
	);
};

const ApexsAmount = ({ apex, setSelectedApex, setCustomApex, selected }) => {
	return (
		<div
			className={`flex flex-row items-center justify-start p-3 m-2 shadow-lg rounded-md cursor-pointer ${
				selected && 'bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white'
			}`}
			onClick={() => {
				setSelectedApex(apex);
				setCustomApex(apex);
			}}
		>
			<img
				src={selected ? LOGO : LOGO_COLORED}
				alt='Apex'
				className='w-5 h-5 mr-1'
			/>
			<p>{apex}</p>
		</div>
	);
};

const data = [500, 1000, 3000, 5000, 10000, 20000, 50000, 200000];
export default Deposit;

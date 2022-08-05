import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const Deposite = () => {
	const [selectedApex, setSelectedApex] = useState(0);
	const [customApex, setCustomApex] = useState('');

	const { user } = useSelector((state) => ({ ...state }));

	const navigate = useNavigate();

	const UPI_ID = 'srklohith05@apl';

	const handleAddApexClick = (amount) => {
		if (selectedApex === 0) {
			return toast.error('Please select an apex');
		}

		const paymentLink = `upi://pay?pn=UPAYI&pa=${UPI_ID}&cu=INR&am=${amount}/`;

		window.location = paymentLink;
		const qr = 'https://upayi.ml/qr/' + UPI_ID + '/' + amount;

		navigate('/deposite/apex/payment', {
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
				<div className='flex justify-end items-center text-xs text-center h-16'>
					<div className='p-2'>
						<p>Apex</p>
						<p>₹0.00</p>
					</div>
					<span className='w-[2px] block h-4 bg-gray-600' />
					<div className='p-2'>
						<p>Balance</p>
						<p>₹0.00</p>
					</div>
				</div>
				<div className='bg-[#5271ff] text-white text-xs p-3'>
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
							/>
						);
					})}
					<div
						className={`flex flex-row items-center justify-start p-3 m-2 border-2 rounded-md cursor-pointer ${
							selectedApex === 'custom' && 'bg-[#5271ff] text-white'
						}`}
						onClick={() => setSelectedApex('custom')}
					>
						<img
							src='https://img.icons8.com/emoji/48/000000/basketball-emoji.png'
							alt='Apex'
							className='w-5 h-5 mr-1'
						/>
						<p>Custom</p>
					</div>
				</div>
				{selectedApex === 'custom' && (
					<div className='flex flex-1 justify-between mx-3 text-sm mb-3'>
						<p>Enter Apex:</p>
						<input
							type='text'
							className='border-b-2 border-[#5271ff] w-14 outline-none text-right'
							placeholder='00000'
							value={customApex}
							onInput={(e) => {
								setCustomApex(e.target.value.replace(/[^0-9]/g, ''));
							}}
							onPaste={() => false}
							maxLength={7}
							minLength={3}
						/>
					</div>
				)}
				<div className='flex flex-1 justify-between mx-3 text-sm '>
					<p>Deposite Amount:</p>
					<p>₹{selectedApex}</p>
				</div>
				<div
					className='p-2 bg-[#5271ff] m-3 rounded-lg text-white text-center'
					onClick={() => handleAddApexClick(selectedApex)}
				>
					Add Apex
				</div>
				<p className='underline text-center text-xs text-[#5271ff]'>Get help</p>
			</div>
		</>
	);
};

const ApexsAmount = ({ apex, setSelectedApex, selected }) => {
	return (
		<div
			className={`flex flex-row items-center justify-start p-3 m-2 border-2 rounded-md cursor-pointer ${
				selected && 'bg-[#5271ff] text-white'
			}`}
			onClick={() => setSelectedApex(apex)}
		>
			<img
				src='https://img.icons8.com/emoji/48/000000/basketball-emoji.png'
				alt='Apex'
				className='w-5 h-5 mr-1'
			/>
			<p>{apex}</p>
		</div>
	);
};

const data = [500, 1000, 3000, 5000, 10000, 20000, 50000, 200000];
export default Deposite;
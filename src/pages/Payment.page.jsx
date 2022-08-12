import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { createdeposit } from '../axios/payment.axios';

const Payment = () => {
	const [copyText, setCopyText] = useState('');
	const [referenceID, setReferenceID] = useState('');

	const location = useLocation();
	const navigate = useNavigate();
	const { state } = location;
	const { UPI_ID, qr, paymentLink, user, amount } = state;

	const copy_UPI_ID = () => {
		setCopyText(UPI_ID);
		copy(UPI_ID);
		toast.success('UPI ID copied to clipboard');
	};

	const handleSubmit = async (e) => {
		await createdeposit(user.user.id, amount, referenceID).then((res) => {
			if (res.data.message === 'Success') {
				toast.success(
					'Payment waiting for confirmation. Your APEX will be added to your account after confirmation.'
				);
				navigate('/');
			} else {
				toast.error('Some error occured. Contact admin.');
				navigate('/');
			}
		});
	};

	return (
		<>
			<Helmet>
				<title>CONFIRM PAYMENT | APEX RETURNS</title>
			</Helmet>
			<div className='flex flex-1 flex-col items-center h-screen w-screen bg-gradient-to-l from-cyan-500 to-[#5271ff] pb-20'>
				<div className='flex justify-end items-center text-xs text-center w-screen h-16 bg-white shadow-lg'>
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
				<div className='pt-12 flex flex-col items-center text-white text-center'>
					<img src={qr} alt='QR' className='w-44 h-44' />
					<div
						className='flex 
				'
					>
						<h2>{UPI_ID}</h2>
						<h2 onClick={() => copy_UPI_ID()} className='ml-2'>
							{!copyText ? 'Copy' : 'Copied'}
						</h2>
					</div>
					<div
						className={`${
							window.innerWidth > 800 ? 'hidden' : 'block'
						} bg-gradient-to-l from-cyan-500 to-[#5271ff] w-full rounded-lg mt-3 py-2`}
						onClick={() => (window.location = paymentLink)}
					>
						OPEN UPI APP
					</div>
				</div>
				<div className='text-white flex flex-col justify-start items-center mt-3'>
					<h2>Enter the bill reference id</h2>
					<input
						type='text'
						className='mt-3 bg-opacity-40 bg-white w-full p-2 rounded-md shadow-sm outline-none'
						value={referenceID}
						onChange={(e) => setReferenceID(e.target.value)}
						onPaste={(e) => setReferenceID(e.target.value)}
					/>
					<button
						className='bg-gradient-to-l from-cyan-500 to-[#5271ff] w-full rounded-lg mt-3 py-2'
						onClick={handleSubmit}
					>
						Confirm
					</button>
				</div>
			</div>
		</>
	);
};

export default Payment;

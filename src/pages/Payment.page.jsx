import { useState } from 'react';
// import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

import { createDepositBackup } from '../axios/payment.axios';

import LOGO from '../assets/logo_full_white.png';

const Payment = () => {
	// const [copyText, setCopyText] = useState('');
	const [referenceID, setReferenceID] = useState('');
	const { user } = useSelector((state) => ({ ...state.user }));
	console.log(user);
	// const location = useLocation();
	const navigate = useNavigate();
	// const { state } = location;
	// const { user, amount } = state;

	// const copy_UPI_ID = () => {
	// setCopyText(UPI_ID);
	// copy(UPI_ID);
	// 	toast.success('UPI ID copied to clipboard');
	// };

	const handleSubmit = async (e) => {
		await createDepositBackup(user.user.id, referenceID).then((res) => {
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
			<div className='flex flex-1 flex-col items-center justify-center h-screen w-screen pb-20'>
				<div className='flex justify-between items-center text-xs text-center h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white fixed top-0 left-0 right-0'>
					<img src={LOGO} alt='APEX RETURNS' className='w-36 ml-2' />
					<div className='flex items-center justify-center'>
						<div className='p-2'>
							<p>Apex</p>
							<p>{user.total_apex > 0 ? user.total_apex : 0}</p>
						</div>
						<span className='w-[2px] block h-4 bg-white' />
						<div className='p-2'>
							<p>Balance</p>
							<p>₹{user.amount > 0 ? user.amount : '0.00'}</p>
						</div>
					</div>
				</div>
				{/* <div className='pt-12 flex flex-col items-center text-center'> */}
				{/* <img src={qr} alt='QR' className='w-44 h-44' /> */}
				{/* <div
						className='flex 
				'
					>
						<h2>{UPI_ID}</h2>
						<h2 onClick={() => copy_UPI_ID()} className='ml-2'>
							{!copyText ? 'Copy' : 'Copied'}
						</h2>
					</div> */}
				{/* <div
						className={`${
							window.innerWidth > 800 ? 'hidden' : 'block'
						} bg-gradient-to-l from-cyan-500 to-[#5271ff] w-full rounded-lg mt-3 py-2 text-white`}
						onClick={() => (window.location = paymentLink)}
					>
						OPEN UPI APP
					</div> */}
				{/* </div> */}
				<div className=' flex-col justify-start items-center mt-3 '>
					<h2 className='text-center'>Enter the bill reference id</h2>
					{/* <input
						type='text'
						className='mt-3 bg-opacity-40 bg-white w-full p-2 rounded-md shadow-sm outline-none'
						value={referenceID}
						onChange={(e) => setReferenceID(e.target.value)}
						onPaste={(e) => setReferenceID(e.target.value)}
					/> */}
					<TextField
						id='outlined-basic'
						size='small'
						label='Reference ID'
						variant='outlined'
						sx={{
							width: '100%',
							marginBottom: '.5rem',
							marginTop: '1rem'
						}}
						value={referenceID}
						onChange={(e) => setReferenceID(e.target.value)}
						onPaste={(e) => setReferenceID(e.target.value)}
						inputProps={{
							maxLength: 10,
							minLength: 10
						}}
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

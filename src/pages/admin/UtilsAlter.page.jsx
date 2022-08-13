import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

import { changeUPI, UIPGet } from '../../axios/admin.axios';

import LOGO_FULL from '../../assets/logo_full_white.png';

const UtilsAlter = () => {
	// const navigate = useNavigate();

	// const [isChangeUPIOpen, setIsChangeUPIOpen] = useState(false);
	const [upiID, setUpiID] = useState('');

	useEffect(() => {
		UIPGet().then((res) => {
			setUpiID(res.data);
		});
	}, []);

	return (
		<div className='flex h-screen flex-col justify-center items-center'>
			<Helmet>
				<title>ADMIN HOME | APEX RETURNS</title>
			</Helmet>
			<div className='absolute top-0'>
				<div className='w-screen bg-gray-600 p-2 h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] border-b-2 border-white'>
					<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36' />
				</div>
			</div>
			{/* {isChangeUPIOpen && ( */}
			<div className=' z-50 w-screen fixed flex items-center justify-center'>
				<div className='bg-white shadow-lg p-5 rounded m-5'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							changeUPI(upiID).then((res) => {
								if (res.status === 200) {
									toast.success('UPI ID changed successfully');
								}
							});
						}}
					>
						<TextField
							id='outlined-basic'
							size='small'
							label='UPI ID'
							variant='outlined'
							sx={{
								width: '100%'
							}}
							value={upiID}
							onChange={(e) => setUpiID(e.target.value)}
							inputProps={{
								maxLength: 10,
								minLength: 10
							}}
							autoFocus
						/>
						<button className='p-2 w-full text-center text-white  bg-gradient-to-l from-cyan-500 to-[#5271ff] mt-3 rounded'>
							Submit
						</button>
					</form>
				</div>
			</div>
			{/* )} */}
			{/* <div className='flex w-screen flex-col justify-center items-center'>
				<div
					className='bg-gradient-to-l from-cyan-500 to-[#5271ff] inline-block text-white p-5 w-1/2 m-3 text-center rounded shadow-md'
					onClick={() => setIsChangeUPIOpen(true)}
				>
					Change UPI ID
				</div>
				<div
					className='bg-gradient-to-l from-cyan-500 to-[#5271ff] inline-block text-white p-5 w-1/2 m-3 text-center rounded shadow-md'
					onClick={() => navigate('/withdraw')}
				>
					Withdraw Requests
				</div>
				<div
					className='bg-gradient-to-l from-cyan-500 to-[#5271ff] inline-block text-white p-5 w-1/2 m-3 text-center rounded shadow-md'
					onClick={() =>
						navigate('/deposit', { state: { locate: '/deposit' } })
					}
				>
					Deposit Verification
				</div>
			</div> */}
		</div>
	);
};

export default UtilsAlter;

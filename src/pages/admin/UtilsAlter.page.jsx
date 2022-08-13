import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { changeUPI, UIPGet } from '../../axios/admin.axios';

import LOGO_FULL from '../../assets/logo_full_white.png';

const UtilsAlter = () => {
	const [upiID, setUpiID] = useState('');
	const dispatch = useDispatch();

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
			<div className='absolute top-0 flex'>
				<div className='w-screen bg-gray-600 p-2 h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] border-b-2 border-white'>
					<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36' />
				</div>
				<img
					src='https://img.icons8.com/external-regular-kawalan-studio/96/ffffff/external-logout-user-interface-regular-kawalan-studio.png'
					alt='LOGOUT'
					onClick={() => {
						toast.success('Logged out');
						dispatch({
							type: 'SET_USER',
							payload: null
						});
					}}
					className='bg-transparent absolute top-0 right-0 w-12 pr-2 mt-3'
				/>
			</div>
			{/* {isChangeUPIOpen && ( */}
			<div className=' z-50 w-screen fixed flex items-center justify-center'>
				<div className='bg-white shadow-lg p-5 rounded m-5'>
					<h1 className='text-center pb-5 text-lg font-semibold'>
						Change UPI ID
					</h1>
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

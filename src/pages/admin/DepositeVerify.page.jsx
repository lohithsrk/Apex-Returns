import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import LOGO_FULL from '../../assets/logo_full_white.png';

import {
	depositVerificationGet,
	depositVerificationPost
} from '../../axios/admin.axios';

const DepositVerify = () => {
	const [depositRequests, setdepositRequests] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		depositVerificationGet().then((res) => {
			setdepositRequests(res.data);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>ADMIN HOME | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='w-screen bg-gray-600 p-2 h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] border-b-2 border-white'>
					<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36' />
					<img
						src='https://img.icons8.com/external-regular-kawalan-studio/96/ffffff/external-logout-user-interface-regular-kawalan-studio.png'
						alt='LOGOUT'
						onClick={() => {
							toast.success('Logged out');
							dispatch({
								type: 'SET_USER',
								payload: null
							});
							navigate('/login');
						}}
						className='bg-transparent absolute top-0 right-0 w-12 pr-2 mt-3'
					/>
				</div>
			</div>
			<div className='p-2 pb-20'>
				<div className='grid grid-cols-4 pb-2 border-b-2 border-[#5271ff]'>
					<p className='text-xs text-center font-semibold'>User ID</p>
					{/* <p className='text-xs text-center font-semibold'>Amount</p> */}
					<p className='text-xs text-center font-semibold'>Reference ID</p>
					<p className='text-xs text-center font-semibold'>Date</p>
					<p className='text-xs text-center font-semibold'>Status</p>
				</div>
				{depositRequests.length > 0 ? (
					depositRequests
						.sort(function (a, b) {
							// Turn your strings into dates, and then subtract them
							// to get a value that is either negative, positive, or zero.
							return new Date(b.created_at) - new Date(a.created_at);
						})
						.reverse()
						.map((depositRequest, index) => {
							return (
								<div
									key={index}
									className='grid grid-cols-4 pt-2 border-b-2 border-gray-300 pb-1'
								>
									<p className='text-xs text-center'>
										{depositRequest.user_id}
									</p>
									{/* <p className='text-xs text-center'>
										₹{depositRequest.amount}
									</p> */}
									<p className='text-xs text-center'>
										{depositRequest.reference_id}
									</p>
									<p className='text-xs text-center'>
										{new Date(depositRequest.created_at).toLocaleString()}
									</p>
									<p className='text-xs text-center'>
										<select
											defaultValue={depositRequest.approved}
											className='bg-[#5271ff] text-white p-1 pr-0 pl-2  rounded'
											style={{ webkitAppearance: 'none' }}
											onChange={(e) => {
												depositVerificationPost(
													e.target.value,
													depositRequest.id,
													depositRequest.user_id,
													depositRequest.amount
												);
											}}
										>
											<option value='pending'>Pending</option>
											<option value='approved'>Approved</option>
											<option value='rejected'>Rejected</option>
										</select>
									</p>
								</div>
							);
						})
				) : (
					<p className='text-sm  p-2 text-center'>No Withdraw Requests</p>
				)}
			</div>
		</>
	);
};

export default DepositVerify;

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import {
	withdrawRequestsGet,
	withdrawRequestsPost
} from '../../axios/admin.axios';

import LOGO_FULL from '../../assets/logo_full_white.png';

const WithdrawRequest = () => {
	const [withdrawRequests, setWithdrawRequests] = useState([]);

	useEffect(() => {
		withdrawRequestsGet().then((res) => {
			setWithdrawRequests(res.data);
		});
	}, []);

	const handleUPIPay = (UPI_ID, amount) => {
		window.open(`upi://pay?pn=UPAYI&pa=${UPI_ID}&cu=INR&am=${amount}/`);
	};

	return (
		<>
			<Helmet>
				<title>ADMIN HOME | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='w-screen bg-gray-600 p-2 h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] border-b-2 border-white'>
					<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36' />
				</div>
				<div className='p-2 pb-20'>
					<div className='grid grid-cols-5 pb-2 border-b-2 border-[#5271ff]'>
						<p className='text-xs text-center font-semibold'>User ID</p>
						<p className='text-xs text-center font-semibold'>Amount</p>
						<p className='text-xs text-center font-semibold'>UPI ID</p>
						<p className='text-xs text-center font-semibold'>Date</p>
						<p className='text-xs text-center font-semibold'>Status</p>
					</div>
					{withdrawRequests.length > 0 ? (
						withdrawRequests
							.sort(function (a, b) {
								// Turn your strings into dates, and then subtract them
								// to get a value that is either negative, positive, or zero.
								return new Date(b.created_at) - new Date(a.created_at);
							})
							.reverse()
							.map((withdrawRequest, index) => {
								return (
									<div
										key={index}
										className='grid grid-cols-5 pt-2 border-b-2 border-gray-300 pb-1'
									>
										<p className='text-xs text-center'>
											{withdrawRequest.user_id}
										</p>
										<p className='text-xs text-center'>
											₹{withdrawRequest.amount}
										</p>
										<p
											className='text-xs text-center'
											onClick={() =>
												handleUPIPay(
													withdrawRequest.upi_id,
													withdrawRequest.amount
												)
											}
										>
											{withdrawRequest.upi_id}
										</p>
										<p className='text-xs text-center'>
											{new Date(withdrawRequest.created_at).toLocaleString()}
										</p>
										<p className='text-xs text-center'>
											<select
												defaultValue={withdrawRequest.approved}
												className='bg-[#5271ff] text-white p-1 pr-0 pl-2  rounded'
												style={{ webkitAppearance: 'none' }}
												onChange={(e) => {
													withdrawRequestsPost(
														e.target.value,
														withdrawRequest.id,
														withdrawRequest.user_id,
														withdrawRequest.amount
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
			</div>
		</>
	);
};

export default WithdrawRequest;

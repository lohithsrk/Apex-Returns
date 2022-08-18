import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import { ordersGet } from '../axios/orders.axios';

import LOGO from '../assets/logo_full_white.png';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [currentArray, setCurrentArray] = useState('deposit');

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		ordersGet(user.user.id).then((res) => {
			setOrders(res.data);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>ORDERS | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='flex justify-between items-center text-xs text-center h-16 shadow-lg bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white border-b-2 border-white'>
					<img src={LOGO} alt='APEX RETURNS' className='w-36 ml-2' />
					<div className='flex justify-center items-center'>
						<div className='p-2'>
							<p>
								Obtained <br /> Already
							</p>
							<p>
								₹
								{user.user.amountObtainedAlready > 0
									? user.user.amountObtainedAlready.toFixed(2)
									: 0}
							</p>
						</div>
						<span className='w-[2px] block h-4 bg-gray-600' />
						<div className='p-2'>
							<p>
								Current <br /> Daily Returns
							</p>
							<p>
								₹
								{user.user.currentDailyReturns > 0
									? user.user.currentDailyReturns.toFixed(2)
									: 0}
							</p>
						</div>
					</div>
				</div>
				<div className='bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white text-xs px-6 py-3 '>
					<ul className='list-disc'>
						<li>
							Only 24H after deposit, rather than the moment you purchase, you
							receive its first daily return at your balance.
						</li>
						<li>
							You can keep multiple plans simultaneously, no matter same or
							different ones.
						</li>
						<li>
							All investment plans are only activated by tickets.&nbsp;
							<Link to='/deposit' className='font-semibold underline'>
								Please click here to buy Apex if needed.
							</Link>
						</li>
					</ul>
				</div>
				<div className='flex justify-between items-center p-2'>
					<div className='text-lg'>Orders</div>
					<select
						defaultValue={currentArray}
						className='bg-[#5271ff] text-white p-2 rounded'
						onChange={(e) => {
							setCurrentArray(e.target.value);
						}}
					>
						<option value='deposit'>Deposit</option>
						<option value='withdraw'>Withdraw</option>
					</select>
				</div>
				<div className='pb-20'>
					<div className='grid grid-cols-2 text-center p-2 text-sm border-b-[1px]'>
						<span className='text-xs font-semibold'>Bought</span>
						<span className='text-xs font-semibold'>Date</span>
					</div>
					{orders[currentArray] && orders[currentArray].length > 0 ? (
						orders[currentArray].map((order, index) => {
							return (
								<div
									className='grid grid-cols-2 p-2 text-sm border-b-[1px] text-center'
									key={index}
								>
									<div>{order.amount > 0 ? order.amount : 0} Apex</div>
									<div>
										{new Date(order.created_at).toLocaleString().split(',')[0]}
										<br />
										{new Date(order.created_at).toLocaleString().split(',')[1]}
									</div>
									{/* <div
										className={`${
											status === 'pending'
												? 'text-yellow-400'
												: status === 'approved'
												? 'text-green-600'
												: 'text-red-600'
										}`}
									>
										<span className='text-xs font-semibold text-black'>
											Status
										</span>
										<br />
										{order.verification}
									</div> */}
								</div>
							);
						})
					) : (
						<div className='p-3 text-center border-b-[1px]'>
							No {currentArray} found
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Orders;

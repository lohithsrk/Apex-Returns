import React from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
	return (
		<div>
			<div className='flex justify-end items-center text-xs text-center h-16'>
				<div className='p-2'>
					<p>
						Obtained <br /> Already
					</p>
					<p>₹0.00</p>
				</div>
				<span className='w-[2px] block h-4 bg-gray-600' />
				<div className='p-2'>
					<p>
						Current <br /> Daily Returns
					</p>
					<p>₹0.00</p>
				</div>
			</div>
			<div className='bg-[#5271ff] text-white text-xs px-6 py-3 '>
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
						<Link to='/deposite' className='font-semibold underline'>
							Please click here to buy Apex if needed.
						</Link>
					</li>
				</ul>
			</div>

            
		</div>
	);
};

export default Orders;

import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Payment = () => {
	const [copyText, setCopyText] = useState('');
	const [referenceID, setReferenceID] = useState('');

	const location = useLocation();
	const { state } = location;
	const { UPI_ID } = state;

	const copy_UPI_ID = () => {
		setCopyText(UPI_ID);
		copy(UPI_ID);
		toast.success('UPI ID copied to clipboard');
	};

	const handleSubmit = (e) => {
		
	};

	return (
		<div className='flex flex-1 flex-col items-center h-screen w-screen bg-gradient-to-l from-cyan-500 to-blue-500 pb-20'>
			<div className='flex justify-end items-center text-xs text-center w-screen h-16 bg-white shadow-lg'>
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
			<div className='pt-12 text-white text-center'>
				<img
					src='data:image/png;base64,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'
					alt='QR Code'
					className='w-40 mb-3'
				/>
				<div
					className='flex 
				'
				>
					<h2>{UPI_ID}</h2>
					<h2 onClick={() => copy_UPI_ID()} className='ml-2'>
						{!copyText ? 'Copy' : 'Copied'}
					</h2>
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
					className='bg-blue-500 w-full rounded-lg mt-3 py-2'
					onClick={handleSubmit}
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default Payment;

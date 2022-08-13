import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createWithdraw } from '../axios/withdraw.axios';

import LOGO from '../assets/logo-colored.png';

const Withdraw = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [amount, setAmount] = useState(0);
	const [upiInput, setUpiInput] = useState('');

	const handleWithdraw = () => {
		const minWithdrawAmount = 250;

		if (amount < minWithdrawAmount) {
			return toast.error('Minimum withdraw amount is 250');
		} else if (amount > user.user.amount) {
			return toast.error('Not enough balance');
		} else {
			createWithdraw(user.user.id, amount, upiInput)
				.then((res) => {
					if (res.status === 200) {
						toast.success(
							'Your withdrawal request will be processed within two days.'
						);
						setAmount(0);
						setUpiInput('');
					} else {
						toast.error('Withdrawal failed');
						setAmount(0);
						setUpiInput('');
					}
				})
				.catch((err) => {
					toast.error('Withdrawal failed');
				});
		}
	};

	return (
		<>
			<Helmet>
				<title>WITHDRAW | APEX RETURNS</title>
			</Helmet>

			<div className='flex justify-between items-center text-xs text-center h-16 bg-white text-[#5271ff] fixed w-screen z-10'>
				<img src={LOGO} alt='APEX RETURNS' className='w-16 ml-2' />
				<div className='flex justify-center items-center'>
					<div className='p-2'>
						<p>Apex</p>
						<p>{user.user.total_apex ? user.user.total_apex : 0}</p>
					</div>
					<span className='w-[2px] block h-4 bg-white' />
					<div className='p-2'>
						<p>Balance</p>
						<p>₹{user.user.amount ? user.user.amount : '0.00'}</p>
					</div>
				</div>
			</div>
			<div className='bg-gradient-to-br from-cyan-500 to-[#5271ff] flex top-0 bottom-0 absolute justify-center items-center flex-col'>
				<div>
					<h1 className='text-white text-center mt-8 text-2xl mb-12'>
						WITHDRAW APEX
					</h1>
					<div className='w-screen flex flex-col items-center justify-center mb-16'>
						<input
							type='text'
							className='border-b-[2px] border-white w-2/5 outline-none p-2 pb-1 text-white font-medium bg-transparent max-w-prose mb-10 text-center placeholder:text-white placeholder:text-opacity-50 '
							autoFocus
							placeholder='Enter the amount'
							onInput={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
							value={amount <= 0 ? '' : amount}
						/>
						<input
							type='text'
							className='border-b-[2px] border-white w-2/5 outline-none p-2 pb-1 text-white font-medium bg-transparent max-w-prose mb-10 text-center placeholder:text-white placeholder:text-opacity-50'
							placeholder='Enter your UPI ID'
							value={upiInput}
							onChange={(e) => setUpiInput(e.target.value)}
						/>
						<p className='text-white text-xs'>
							Withdrawal fee and tax 8% applicable
						</p>
						<div
							className='bg-white shadow font-semibold text-[#5271ff] p-2 px-3 rounded mt-3'
							onClick={handleWithdraw}
						>
							WITHDRAW
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Withdraw;

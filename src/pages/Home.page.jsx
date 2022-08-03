import React from 'react';

const Home = () => {
	const percentage = (daily_returns, return_period, deposite_amount) =>
		(daily_returns * return_period) / deposite_amount;

	return (
		<>
			<div className='flex justify-end items-center text-xs text-center h-16'>
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
			<div className='flex flex-1 w-screen bg-gradient-to-l from-cyan-500 to-blue-500 pb-20'>
				<div className='flex flex-col items-center w-screen'>
					{plans.map((plan, index) => (
						<div className='bg-white bg-opacity-20 backdrop-blur-md p-4  rounded-lg w-5/6 m-5 shadow-lg'>
							<div className='flex bg-gradient-to-l from-cyan-500 to-blue-500 p-2 rounded-lg text-white text-center items-center justify-between w-full'>
								<div>APEX RETURNS</div>
								<div className='flex'>
									<h3>{plan.name}</h3>
									<span>|</span>
									<h3>
										Total &nbsp;
										{percentage(
											plan.daily_returns,
											plan.return_period,
											plan.deposite_amount
										)}
										%
									</h3>
								</div>
							</div>
							<div className='flex w-full items-center justify-between p-2 text-white'>
								<div className='text-left'>
									<div>
										<p>Deposit Amount</p>
										<p>{plan.deposite_amount}</p>
									</div>
									<div>
										<p>Return Period</p>
										<p>{plan.return_period}</p>
									</div>
								</div>
								<div className='text-right'>
									<div>
										<p>Daily Returns</p>
										<p>{plan.daily_returns}</p>
									</div>
									<div>
										<p>Total Returns</p>
										<p>
											Total &nbsp;
											{percentage(
												plan.daily_returns,
												plan.return_period,
												plan.deposite_amount
											)}
											%
										</p>
									</div>
								</div>
							</div>
							<div className='bg-gradient-to-l from-cyan-500 to-blue-500 p-2 rounded-lg text-white text-center'>
								{plan.deposite_amount}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

const plans = [
	{
		id: 'sfsdfsdfds',
		name: 'basic',
		deposite_amount: 100,
		daily_returns: 20,
		return_period: 30,
		total_return: 600,
		created_at: '2020-01-01',
		updated_at: '2020-01-01'
	},
	{
		id: 'sfsdfsdfds',
		name: 'basic',
		deposite_amount: 100,
		daily_returns: 20,
		return_period: 30,
		total_return: 600,
		created_at: '2020-01-01',
		updated_at: '2020-01-01'
	},
	{
		id: 'sfsdfsdfds',
		name: 'basic',
		deposite_amount: 100,
		daily_returns: 20,
		return_period: 30,
		total_return: 600,
		created_at: '2020-01-01',
		updated_at: '2020-01-01'
	},
	{
		id: 'sfsdfsdfds',
		name: 'basic',
		deposite_amount: 100,
		daily_returns: 20,
		return_period: 30,
		total_return: 600,
		created_at: '2020-01-01',
		updated_at: '2020-01-01'
	},
	{
		id: 'sfsdfsdfds',
		name: 'basic',
		deposite_amount: 100,
		daily_returns: 20,
		return_period: 30,
		total_return: 600,
		created_at: '2020-01-01',
		updated_at: '2020-01-01'
	}
];

export default Home;

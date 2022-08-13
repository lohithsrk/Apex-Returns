import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { withdrawRequestsGet } from '../../axios/admin.axios';

import LOGO_FULL from '../../assets/logo_full_white.png';

const WithdrawRequest = () => {
	const [withdrawRequests, setWithdrawRequests] = useState([]);

	useEffect(() => {
		withdrawRequestsGet().then((res) => {
			setWithdrawRequests(res.data);
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
				</div>
				<div>
					{withdrawRequests.map((withdrawRequest) => {
						return (
							<div key={withdrawRequest.id}>
								<p>{withdrawRequest.id}</p>
								<p>{withdrawRequest.amount}</p>
								<p>{withdrawRequest.status}</p>
								<p>{withdrawRequest.created_at}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default WithdrawRequest;

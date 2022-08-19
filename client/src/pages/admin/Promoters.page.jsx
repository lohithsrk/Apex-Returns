import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

import { addPromoter, promotersGet } from '../../axios/admin.axios';

import LOGO_FULL from '../../assets/logo_full_white.png';

const Promoters = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isDialogueBoxOpen, setisDialogueBoxOpen] = useState(false);
	const [promoterID, setPromoterID] = useState();
	const [allPromoters, setAllPromoters] = useState([]);

	const promotersGetHandler = async () =>
		promotersGet().then((res) => setAllPromoters(res.data));

	useEffect(() => {
		promotersGetHandler();
	}, []);

	return (
		<>
			<Helmet>
				<title>ADMIN HOME | APEX RETURNS</title>
			</Helmet>
			<div className='0 flex'>
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
						navigate('/login');
					}}
					className='bg-transparent absolute top-0 right-0 w-12 pr-2 mt-3'
				/>
			</div>
			<div>
				{isDialogueBoxOpen && (
					<div className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center'>
						<div className='bg-white p-5 rounded shadow-lg'>
							<TextField
								id='outlined-basic'
								size='small'
								label='Enter Promoter ID'
								variant='outlined'
								sx={{
									width: '100%'
								}}
								value={promoterID}
								onChange={(e) => setPromoterID(e.target.value)}
								autoFocus
							/>
							<div
								className='mt-3 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white text-center rounded p-2'
								onClick={() => {
									setisDialogueBoxOpen(false);
									addPromoter(promoterID).then((res) => {
										toast.success('Promoter added');
										promotersGetHandler();
									});
								}}
							>
								Save Promoter
							</div>
						</div>
					</div>
				)}
				<div
					className=' m-1 bg-gradient-to-l from-cyan-500 to-[#5271ff] text-white text-center rounded p-2'
					onClick={() => setisDialogueBoxOpen(true)}
				>
					Add Promoter
				</div>
				<div className='p-2 pb-20'>
					<div className='grid grid-cols-2 pb-2 border-b-2 border-[#5271ff]'>
						<p className='text-xs text-center font-semibold'>User ID</p>
						<p className='text-xs text-center font-semibold'>Total Reach</p>
					</div>
					{allPromoters.length > 0 ? (
						allPromoters
							.sort(function (a, b) {
								// Turn your strings into dates, and then subtract them
								// to get a value that is either negative, positive, or zero.
								return new Date(b.created_at) - new Date(a.created_at);
							})
							.reverse()
							.map((allPromoter, index) => {
								return (
									<div
										key={index}
										className='grid grid-cols-2 pt-2 border-b-2 border-gray-300 pb-1'
									>
										<p className='text-xs text-center'>
											{allPromoter.referred_by}
										</p>
										<p className='text-xs text-center'>
											{allPromoter['COUNT(reference.referred_by)']}
										</p>
									</div>
								);
							})
					) : (
						<p className='text-sm  p-2 text-center'>No Promoters Found</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Promoters;

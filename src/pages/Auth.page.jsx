import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import LOGO from '../assets/logo_full_white.png';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { login, signup, validateUser } from '../axios/auth.axios';

const Auth = () => {
	const [authPage, setAuthPage] = useState('/login');
	const [showPassword, setShowPassword] = useState(false);
	const [phone_number, setPhone_number] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) {
			validateUser(user.token)
				.then((res) => {
					if (res.data.isLoggedIn) {
						navigate('/');
					} else {
						dispatch({ type: 'SET_USER', payload: null });
						toast.success('Session expired! Please login again to continue');
						navigate('/login');
					}
				})
				.catch((err) => {
					dispatch({ type: 'SET_USER', payload: null });
					toast.error('Session expired! Please login again to continue');
					navigate('/login');
				});
		} else {
			if (location.pathname !== '/login') {
				navigate('/login');
			}
		}
	}, [navigate, location.pathname, user, dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (phone_number.length === 10 && password.length >= 8) {
			if (confirmPassword.length > 0) {
				if (password !== confirmPassword) {
					toast.error('Passwords do not match');
					return;
				}
				await signup(phone_number, password)
					.then((res) => {
						dispatch({
							type: 'SET_USER',
							payload: {
								token: res.data.token,
								isLoggedIn: true,
								user: res.data.user
							}
						});
						navigate('/');
					})
					.catch((err) => {
						setPhone_number('');
						setPassword('');
						setConfirmPassword('');

						toast.error(err.response.data.error);
					});
			} else {
				await login(phone_number, password)
					.then((res) => {
						dispatch({
							type: 'SET_USER',
							payload: {
								token: res.data.token,
								isLoggedIn: true,
								user: res.data.user
							}
						});
						navigate('/');
					})
					.catch((err) => {
						setPhone_number('');
						setPassword('');
						setConfirmPassword('');
						toast.error(err.response.data.error);
					});
			}
		} else {
			toast.error('Password must be above 8 characters');
		}
	};

	return (
		<>
			<Helmet>
				<title>LOGIN | SIGNUP</title>
			</Helmet>
			<div className='flex flex-1 flex-col h-screen items-center bg-gradient-to-br from-cyan-500 to-[#5271ff] pt-32'>
				<div className='-translate-y-10 flex flex-col items-center'>
					<img src={LOGO} alt='APEX RETURNS' className='w-48 drop-shadow-lg' />
					<div className='flex justify-between p-1 items-center bg-gray-600 bg-opacity-40 rounded-full relative my-6'>
						<div
							className={`bg-white w-1/2 h-8 rounded-full absolute ${
								authPage === '/signup' && '-translate-x-1 right-0'
							}`}
						></div>
						<h3
							className={`text-center w-28 py-1 ${
								authPage === '/signup' ? 'text-white z-0' : 'text-[#5271ff] z-10'
							}`}
							onClick={() => {
								setAuthPage('/login');
								setPhone_number('');
								setPassword('');
								setConfirmPassword('');
							}}
						>
							Existing
						</h3>
						<h3
							className={`text-center w-28 py-1 ${
								authPage === '/signup' ? 'text-[#5271ff] z-10' : 'text-white z-0'
							}`}
							onClick={() => {
								setAuthPage('/signup');
								setPhone_number('');
								setPassword('');
								setConfirmPassword('');
							}}
						>
							New
						</h3>
					</div>
					<form onSubmit={handleSubmit} className='w-full'>
						<div className='w-3/4 p-7 pb-0 flex flex-col bg-white rounded-lg items-center justify-center mx-auto'>
							<PhoneInput
								phone_number={phone_number}
								setPhone_number={setPhone_number}
							/>
							<PasswordInput
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								password={password}
								setPassword={setPassword}
								name='Password'
							/>
							{authPage === '/signup' && (
								<PasswordInput
									showPassword={showPassword}
									setShowPassword={setShowPassword}
									password={confirmPassword}
									setPassword={setConfirmPassword}
									name='Confirm Password'
									style={{ marginTop: '1rem' }}
								/>
							)}
							<button className='bg-gradient-to-l from-cyan-500 to-[#5271ff] w-min p-3 px-10 rounded-lg relative bottom-0 translate-y-1/2 font-semibold text-white'>
								{authPage !== '/signup' ? 'LOGIN' : 'SIGNUP'}
							</button>
						</div>
					</form>
					{/* <Link className='text-white mt-10' to='/forget-password'>
						Forgot Password?
					</Link> */}
				</div>
			</div>
		</>
	);
};

const PhoneInput = ({ phone_number, setPhone_number }) => {
	return (
		<TextField
			id='outlined-basic'
			size='small'
			label='Phone'
			variant='outlined'
			sx={{
				width: '100%',
				marginBottom: '1rem'
			}}
			value={phone_number}
			onInput={(e) => {
				setPhone_number(e.target.value.replace(/[^0-9]/g, ''));
			}}
			inputProps={{
				maxLength: 10,
				minLength: 10
			}}
		/>
	);
};

const PasswordInput = ({
	showPassword,
	setShowPassword,
	password,
	setPassword,
	name,
	style
}) => {
	return (
		<FormControl variant='outlined' sx={style}>
			<InputLabel size='small' htmlFor='outlined-adornment-password'>
				{name}
			</InputLabel>
			<OutlinedInput
				className='w-full'
				id='outlined-adornment-password'
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				size='small'
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							onClick={() => setShowPassword(!showPassword)}
							onMouseDown={(e) => e.preventDefault()}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label='Password'
			/>
		</FormControl>
	);
};

export default Auth;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavbarMobile = () => {
	const location = useLocation();

	const [selected, setSelected] = useState({
		name: location.pathname.split('/')[1]
			? location.pathname.split('/')[1][0].toUpperCase() +
			  location.pathname.split('/')[1].slice(1)
			: 'Home',
		index:
			location.pathname === '/'
				? 0
				: location.pathname === '/withdraw'
				? 1
				: location.pathname === '/deposit'
				? 2
				: location.pathname === '/promoters'
				? 3
				: 50
	});
	const circlePosition = Math.round(window.innerWidth / 50 / 10) * 6;

	return (
		<div className='fixed bg-white bottom-0 left-0 right-0 shadow-[0_-2px_5px_rgba(0,0,0,0.25)] py-2 z-50'>
			<div
				className={`rounded-full w-11 h-11 absolute -z-10 translate-y-3/4 bottom-[5.2rem] bg-gradient-to-l from-cyan-500 to-[#5271ff] drop-shadow-[0_-2px_5px_rgba(0,0,0,0.25)]`}
				style={{
					left: `${circlePosition + selected.index * 25
					}%`,
					transition: 'left 0.2s ease-out'
				}}
			></div>
			<div className='flex justify-between'>
				{navItems.map((navItem, index) => {
					const matched = selected.name === navItem.name;
					return (
						<Link
							to={navItem.link}
							className={`flex justify-center items-center flex-col flex-1 ${
								matched && '-translate-y-1/2'
							}`}
							style={{
								transition: 'left 0.2s ease-out'
							}}
							key={index}
						>
							<div
								onClick={() =>
									setSelected({
										name: navItem.name,
										index: index
									})
								}
								className='flex flex-col items-center'
							>
								<img
									src={matched ? navItem.fillIcon : navItem.outlineIcon}
									alt={navItem.name}
									className={`${
										matched ? 'w-7 ' : 'w-6'
									} drop-shadow-[0_-2px_5px_rgba(255,255,255,.3)]`}
									style={{
										transition: 'left 0.2s ease-out'
									}}
								/>
								<p
									className={`text-center ${
										matched
											? 'translate-y-2/4 text-md text-[#5271ff]'
											: 'text-sm text-[#9e9e9e]'
									}`}
									style={{
										transition: 'left 0.2s ease-out'
									}}
								>
									{navItem.name}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

const navItems = [
	{
		name: 'Home',
		link: '/',
		outlineIcon:
			'https://img.icons8.com/fluency-systems-regular/48/9e9e9e/home.png',
		fillIcon: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/home.png'
	},
	{
		name: 'Withdraw',
		link: '/withdraw',
		outlineIcon:
			'https://img.icons8.com/material-outlined/48/9e9e9e/paid-bill.png',
		fillIcon: 'https://img.icons8.com/material-rounded/48/ffffff/paid-bill.png'
	},
	{
		name: 'Deposit',
		link: '/deposit',
		outlineIcon:
			'https://img.icons8.com/fluency-systems-regular/48/9e9e9e/quick-mode-on.png',
		fillIcon:
			'https://img.icons8.com/ios-filled/50/ffffff/quick-mode-on--v1.png'
	}
	,
	{
		name: 'Promoters',
		link: '/promoters',
		outlineIcon:
			'https://img.icons8.com/ios/50/9e9e9e/talk-male.png',
		fillIcon:
			'https://img.icons8.com/ios-filled/50/ffffff/talk-male.png'
	}
];

export default NavbarMobile;

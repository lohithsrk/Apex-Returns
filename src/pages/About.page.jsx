import { Helmet } from 'react-helmet';

import LOGO_FULL from '../assets/logo_full_white.png';
import Slide1 from '../assets/slide1.svg';
import Slide2 from '../assets/slide2.svg';
import Slide3 from '../assets/slide3.svg';
import Slide4 from '../assets/slide4.svg';
import CheckListArrow from '../assets/CheckListArrow.svg';

const About = () => {
	return (
		<>
			<Helmet>
				<title>ME | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='w-screen bg-gray-600 p-2 h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] border-b-2 border-white'>
					<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36' />
				</div>
				<div className='bg-gradient-to-l from-cyan-500 to-[#5271ff] flex justify-end px-2 py-1 text-white '>
        Apexreturns is an investment platform that helps diversify your portfolio with non-market linked investment options.
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='px-6 pb-3 mt-20 pt-16 shadow-lg w-72 text-left rounded-lg relative'>
					<img
						src={Slide1}
						alt='Slide 1'
						className='w-28 absolute top-0 -translate-y-1/2'
					/>
					<h1 className='font-medium text-xl'>Leases</h1>
					<ul>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Asset Backed
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Corporate Credit
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Monthly Returns, 24-36 Months Tenure
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Invest from ₹ 500
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Up to 10% Yield
						</li>
					</ul>
				</div>
				<div className='px-6 pb-3 mt-20 pt-16 shadow-lg w-72 text-left rounded-lg relative'>
					<img
						src={Slide2}
						alt='Slide 1'
						className='w-28 absolute top-0 -translate-y-1/2'
					/>
					<h1 className='font-medium text-xl'>Inventory</h1>
					<ul>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Asset Backed
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Corporate Credit
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							1-13 Months Tenure
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Invest from ₹ 500
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Up to 10% Yield
						</li>
					</ul>
				</div>
				<div className='px-6 pb-3 mt-20 pt-16 shadow-lg w-72 text-left rounded-lg relative '>
					<img
						src={Slide3}
						alt='Slide 3'
						className='w-28 absolute top-0 -translate-y-1/2'
					/>
					<h1 className='font-medium text-xl'>Commercial Real-Estate</h1>
					<ul>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Asset Backed
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							MNC Tenants
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Quaterly Rentals
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Invest from ₹ 500
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Up to 10% Yield
						</li>
					</ul>
				</div>
				<div className='px-6 pb-3 mt-20 mb-24 pt-16 shadow-lg w-72 text-left rounded-lg relative'>
					<img
						src={Slide4}
						alt='Slide 4'
						className='w-28 absolute top-0 -translate-y-1/2'
					/>
					<h1 className='font-medium text-xl'>Start-up Equity</h1>
					<ul>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							High-Growth, Early-Stage companies
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Participate along side VCs
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Long Term Investment Horizon
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							Invest from ₹ 500
						</li>
						<li className='items-center flex my-2 text-base'>
							<img src={CheckListArrow} className='mr-4 w-4' alt='Check' />
							High risk-high-reward
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default About;

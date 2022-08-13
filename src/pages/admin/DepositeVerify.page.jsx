import { Helmet } from 'react-helmet';

import LOGO_FULL from '../../assets/logo_full_white.png';

const DepositeVerify = () => {
	return (
		<>
			<Helmet>
				<title>ADMIN HOME | APEX RETURNS</title>
			</Helmet>
			<div>
				<div className='w-screen bg-gray-600 p-2 h-16 bg-gradient-to-l from-cyan-500 to-[#5271ff] border-b-2 border-white'>
					<img src={LOGO_FULL} alt='APEX RETURNS' className='w-36' />
				</div>
			</div>
		</>
	);
};

export default DepositeVerify;

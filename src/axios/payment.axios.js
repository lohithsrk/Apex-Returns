import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const createDeposite = async (user_id, amount, reference_id,) =>
    await axios.post(`${BASE_URL}/deposite/apex/payment`, { user_id, amount, reference_id, })
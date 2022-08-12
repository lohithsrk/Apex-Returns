import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const createdeposit = async (user_id, amount, reference_id,) =>
    await axios.post(`${BASE_URL}/deposit/apex/payment`, { user_id, amount, reference_id, })
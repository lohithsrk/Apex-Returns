import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const createWithdraw = async (user_id, amount, upi_id) =>
    await axios.post(`${BASE_URL}/withdraw`, { user_id, amount, upi_id })
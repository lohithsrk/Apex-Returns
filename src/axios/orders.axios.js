import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const ordersGet = async (status, user_id) =>
    await axios.post(`${BASE_URL}/orders`, { status, user_id })

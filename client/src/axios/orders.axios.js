import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const ordersGet = async (user_id) =>
    await axios.post(`${BASE_URL}/orders`, { user_id })

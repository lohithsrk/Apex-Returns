import axios from 'axios';

const BASE_URL = 'http://apexreturns.com/api';

export const ordersGet = async (status, user_id) =>
    await axios.post(`${BASE_URL}/orders`, { status, user_id })

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const ordersGet = async (status, user_id) =>
    await axios.post(`${BASE_URL}/orders`, { status, user_id })

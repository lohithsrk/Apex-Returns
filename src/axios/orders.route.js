import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api' : 'http://localhost:8080';

export const ordersGet = async (status, user_id) =>
    await axios.post(`${BASE_URL}/orders`, { status, user_id })

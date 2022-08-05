import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api' : 'http://apexreturns.com/';

export const createDeposite = async (user_id, amount, reference_id,) =>
    await axios.post(`${BASE_URL}/deposite/apex/payment`, { user_id, amount, reference_id, })
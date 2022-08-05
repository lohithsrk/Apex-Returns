import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const createDeposite = async (user_id, amount, reference_id,) =>
    await axios.post(`${BASE_URL}/deposite/apex/payment`, { user_id, amount, reference_id, })
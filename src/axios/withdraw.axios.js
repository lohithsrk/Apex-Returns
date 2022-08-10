import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const createWithdraw = async (user_id, amount, upi_id) =>
    await axios.post(`${BASE_URL}/withdraw`, { user_id, amount, upi_id })
import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api' : 'http://apexreturns.com/';

export const getApexPlans = async () =>
    await axios.get(`${BASE_URL}/plans`)
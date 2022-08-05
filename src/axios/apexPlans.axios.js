import axios from 'axios';

const BASE_URL = 'http://apexreturns.com/api';

export const getApexPlans = async () =>
    await axios.get(`${BASE_URL}/plans`)
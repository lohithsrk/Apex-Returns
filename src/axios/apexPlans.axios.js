import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getApexPlans = async () =>
    await axios.get(`${BASE_URL}/plans`)
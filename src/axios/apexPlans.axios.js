import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = 'http://185.193.125.115/api';

export const getApexPlans = async () =>
    await axios.get(`${BASE_URL}/plans`)
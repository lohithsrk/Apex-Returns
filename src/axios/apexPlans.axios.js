import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const getApexPlans = async () =>
    await axios.get(`${BASE_URL}/plans`)
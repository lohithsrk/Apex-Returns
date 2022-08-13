import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const changeUPI = async (upi) =>
    await axios.post(`${BASE_URL}/admin/changeUPI`, { upi });

export const UIPGet = async () =>
    await axios.get(`${BASE_URL}/admin/changeUPI`);

export const withdrawRequestsGet = async () =>
    await axios.get(`${BASE_URL}/admin/withdraw`);
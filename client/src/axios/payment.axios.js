import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const createDeposit = async (user_id, amount) =>
    await axios.post(`${BASE_URL}/deposit/apex/payment`, { user_id, amount })

export const verifyDeposit = async (client_txn_id, user_id) =>
    await axios.put(`${BASE_URL}/deposit/apex/payment`, {
        client_txn_id,
        user_id
    })
import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const changeUPI = async (upi) =>
    await axios.post(`${BASE_URL}/admin/changeUPI`, { upi });

export const UIPGet = async () =>
    await axios.get(`${BASE_URL}/admin/changeUPI`);

export const withdrawRequestsGet = async () =>
    await axios.get(`${BASE_URL}/admin/withdraw`);

export const withdrawRequestsPost = async (approved, id, user_id, amount) =>
    await axios.post(`${BASE_URL}/admin/withdraw`, {
        approved, id, user_id, amount
    });

export const depositVerificationGet = async () =>
    await axios.get(`${BASE_URL}/admin/deposit`);

export const depositVerificationPost = async (verification, id, user_id, amount) =>
    await axios.post(`${BASE_URL}/admin/deposit`, {
        verification, id, user_id, amount
    });

export const promotersGet = async () =>
    await axios.get(`${BASE_URL}/admin/promoters`);

export const addPromoter = async (id) =>
    await axios.post(`${BASE_URL}/admin/promoters`, { id });
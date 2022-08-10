import axios from 'axios'

import { BASE_URL } from '../utils/common.util';

export const getInvestments = async (user_id) =>
    await axios.get(`${BASE_URL}/investment/${user_id}`)

export const investmentPost = async (user_id, investment_id, amount) =>
    await axios.post(`${BASE_URL}/investment/${user_id}`, {
        investment_id,
        amount
    })

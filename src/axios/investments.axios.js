import axios from 'axios'

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api' : 'http://localhost:8080';

export const getInvestments = async (user_id) =>
    await axios.get(`${BASE_URL}/investment/${user_id}`)

export const investmentPost = async (user_id, investment_id, amount) =>
    await axios.post(`${BASE_URL}/investment/${user_id}`, {
        investment_id,
        amount
    })

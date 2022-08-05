import axios from 'axios'

// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = 'http://185.193.125.115:8080/api';

export const getInvestments = async (user_id) =>
    await axios.get(`${BASE_URL}/investment/${user_id}`)

export const investmentPost = async (user_id, investment_id, amount) =>
    await axios.post(`${BASE_URL}/investment/${user_id}`, {
        investment_id,
        amount
    })

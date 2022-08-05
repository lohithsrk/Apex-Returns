import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = 'http://185.193.125.115:8080/api';


export const login = async (phone_number, password) =>
    await axios.post(`${BASE_URL}/login`, { phone_number, password })

export const signup = async (phone_number, password) =>
    await axios.post(`${BASE_URL}/signup`, { phone_number, password })

export const validateUser = async (token) =>
    await axios.get(`${BASE_URL}/login`, { headers: { "x-access-token": token } })
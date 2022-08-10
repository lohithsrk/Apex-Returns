import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const login = async (phone_number, password) =>
    await axios.post(`${BASE_URL}/login`, { phone_number, password })

export const signup = async (phone_number, password) =>
    await axios.post(`${BASE_URL}/signup`, { phone_number, password })

export const validateUser = async (token) =>
    await axios.get(`${BASE_URL}/login`, { headers: { "x-access-token": token } })
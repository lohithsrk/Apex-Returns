import axios from 'axios';

import { BASE_URL } from '../utils/common.util';

export const referGet = async (user_id) =>
    await axios.get(`${BASE_URL}/reference/${user_id}`)
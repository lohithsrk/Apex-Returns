// export const BASE_URL = ;
export const NODE_ENV = 'development'
// export const NODE_ENV = 'production'

export const BASE_URL = NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://apexreturns.com/api';


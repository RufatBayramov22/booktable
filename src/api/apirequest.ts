import axios from 'axios';

export const API_BASE_URL = 'https://api.yerin.az/api/';

const apiRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiRequest;

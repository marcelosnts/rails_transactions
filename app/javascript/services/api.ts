import axios from 'axios-on-rails';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export default api;
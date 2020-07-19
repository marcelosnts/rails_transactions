import axios from 'axios-on-rails';

const api = axios.create({
  baseURL: 'https://rails-transactions.herokuapp.com/api',
});

export default api;
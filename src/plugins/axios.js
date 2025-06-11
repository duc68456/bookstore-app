import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/bookstore',  
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export default api
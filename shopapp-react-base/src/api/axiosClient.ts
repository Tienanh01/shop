import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle 401, refresh token...
    return Promise.reject(error)
  },
)

export default axiosClient
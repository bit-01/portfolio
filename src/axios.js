import axios from 'axios'

const axi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json,application/pdf',
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'Access-Control-Allow-Origin': '*',
  },
})

export default axi

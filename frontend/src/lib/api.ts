import axios from 'axios'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Health check function
export const checkHealth = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    throw error
  }
}

// API health check
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/api/health')
    return response.data
  } catch (error) {
    console.error('API health check failed:', error)
    throw error
  }
}

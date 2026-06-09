import axios from 'axios'

export function resolveApiBaseUrl(configuredUrl = import.meta.env.VITE_API_URL) {
  const normalizedUrl = configuredUrl?.trim().replace(/\/+$/, '')
  return normalizedUrl || '/api'
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
  )
}

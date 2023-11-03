import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getItem } from 'utils/persistentStorage'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_BACKEND_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export type BaseURL = 'default' | 'analysis'

const instancesURL: Record<BaseURL, string | undefined> = {
  default: process.env.REACT_APP_MAIN_BACKEND_URL,
  analysis: process.env.REACT_APP_ANALYSIS_BACKEND_URL
}

interface InstanceConfig extends AxiosRequestConfig {
  base?: BaseURL
}

export const createInstance = ({
  base = 'default',
  ...config
}: InstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: instancesURL[base],
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json'
    },
    ...config
  })

  instance.interceptors.request.use(
    async (config) => {
      try {
        const token: string = getItem('token')

        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        }
      } catch (e) {
        console.error(e)
      }
      return config
    },
    (error): any => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (response) => response,
    async (error): Promise<any> => await Promise.reject(error)
  )

  return instance
}

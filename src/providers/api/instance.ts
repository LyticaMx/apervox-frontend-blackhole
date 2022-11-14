/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getItem } from 'utils/persistentStorage'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_BACKEND_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// // TODO: Config nedeed interceptors to check requests & responses
// instance.interceptors.request.use(
//   (config) => {
//     const token: string = getItem('token')

//     if (token) {
//       return {
//         ...config,
//         headers: {
//           ...config.headers,
//           Authorization: `Bearer ${token}`
//         }
//       }
//     }

//     return config
//   },
//   (error): any => Promise.reject(error)
// )

// instance.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response
//   },
//   (error): any => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )

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
    (config) => {
      const token: string = getItem('token')

      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        }
      }

      return config
    },
    (error): any => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error): any => {
      return Promise.reject(error)
    }
  )

  return instance
}

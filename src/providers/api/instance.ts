/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuth } from 'context/Auth'
import { isBefore } from 'date-fns'
import jwtDecode from 'jwt-decode'
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
  const { refreshingToken } = useAuth()
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
    async (error): Promise<any> => {
      const interval: {
        id?: NodeJS.Timer
        resolve?: ((value: void | PromiseLike<void>) => void) | null
      } = {}
      try {
        const originalRequest = error.config
        const token: string = getItem('token')
        if (token) {
          const session: any = jwtDecode(token)

          if (
            error.response.status === 401 &&
            error.response.data.message === 'No autorizado.' && // TODO: Definir un mensaje fijo para cuando los tokens se vencen
            isBefore(new Date(session.exp * 1000), new Date())
          ) {
            originalRequest._retry = true
            //! se debe hacer un parse de la data cuando se envíe un application/json
            originalRequest.data =
              originalRequest.data &&
              originalRequest.headers['Content-Type'] === 'application/json'
                ? JSON.parse(originalRequest.data)
                : originalRequest.data
            instance.defaults.headers.common.Authorization = `Bearer ${token}`
            await new Promise<void>((resolve) => {
              const max = 4 * 500
              const counter = { actual: 0 }
              interval.resolve = resolve
              interval.id = setInterval(() => {
                if (counter.actual >= max || !refreshingToken?.current) {
                  clearInterval(interval?.id)
                  delete interval.id
                  delete interval.resolve
                  resolve()
                }
                counter.actual += 500
              }, 500)
            })
            return await instance(originalRequest)
          }
        }
        return await Promise.reject(error)
      } finally {
        clearInterval(interval?.id)
        if (interval.resolve) interval.resolve()
      }
    }
  )

  return instance
}

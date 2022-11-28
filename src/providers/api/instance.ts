/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config } from 'providers/config'
import { getItem } from 'utils/persistentStorage'

export type BaseURL = 'default'

const instancesURL: Record<BaseURL, string | undefined> = {
  default: config.endpoints.mainBackendUrl
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

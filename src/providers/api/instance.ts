import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuth } from 'context/Auth'
import { isAfter, isBefore } from 'date-fns'
import jwtDecode from 'jwt-decode'
import { ResponseData } from 'types/api'
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
  const { actions: authActions } = useAuth()
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
        let token: string = getItem('token')
        const rToken: string = getItem('rToken')
        if (token && rToken) {
          const session: any = jwtDecode(token)
          const decodedRToken: any = jwtDecode(rToken)
          const sessionTime = session.exp * 1000 - 60000
          const rTokenTime = decodedRToken.exp * 1000 - 60000

          if (
            isAfter(new Date(), new Date(sessionTime)) &&
            isBefore(new Date(), new Date(rTokenTime)) &&
            config.url !== 'auth/login'
          ) {
            try {
              const response: ResponseData = (
                await axios.post(
                  `${instancesURL[base]}${
                    process.env.REACT_APP_REFRESH_TOKEN_ENDPOINT ?? ''
                  }`,
                  {},
                  {
                    headers: {
                      'refresh-token': getItem('rToken'),
                      Authorization: `Bearer ${getItem('token')}`
                    }
                  } as any
                )
              ).data
              if (response.data) {
                const newToken: string = response.data.token
                const newRToken: string = response.data.refresh_token

                token = newToken

                authActions?.refreshToken(newToken, newRToken)
              }
            } catch (e) {
              console.error(e)
            }
          }

          return {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${token}`
            }
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
    (response) => {
      return response
    },
    async (error): Promise<any> => await Promise.reject(error)
  )

  return instance
}

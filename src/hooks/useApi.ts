/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { useIntl } from 'react-intl'
import mutexify from 'mutexify/promise'
import QS from 'query-string'

import { createInstance, BaseURL } from 'providers/api'
import { useLoader } from 'context/Loader'

import { apiMessages } from 'globalMessages/api'
import { GeneralParams, ResponseData } from 'types/api'
import { useAuth } from 'context/Auth'
import { getItem, setItem } from 'utils/persistentStorage'
import useToast from './useToast'
import { formatParams } from 'utils/formatParams'

interface Props {
  endpoint: string
  method: 'post' | 'put' | 'get' | 'delete' | 'patch'
  base?: BaseURL
  acceptNulls?: boolean
  withLoader?: boolean
}

interface UrlParams extends GeneralParams {
  [param: string]: any
}

interface Fetch {
  body?: object
  queryString?: string
  urlParams?: UrlParams
  showToast?: boolean
}

// type ApiMessage = keyof typeof apiMessages

const lock = mutexify() // Cambiar a mutex propio

const useApi = ({
  endpoint,
  method,
  base = 'default',
  acceptNulls = false,
  withLoader = true
}: Props) => {
  const intl = useIntl()
  const { actions: loaderActions } = useLoader()
  const { actions: authActions } = useAuth()
  const instance = createInstance({ base })
  const { launchToast } = useToast()

  // Se revisa una sóla vez y permite lanzar múltiples peticiones
  const checkSessionTime = async (): Promise<void> => {
    const release = await lock()
    try {
      if (endpoint !== 'auth/login') await authActions?.refreshToken()
    } finally {
      release()
    }
  }

  const handleFetch = async (
    { body: data, queryString, urlParams, showToast = true }: Fetch = {},
    headers?: Partial<AxiosRequestHeaders>
  ): Promise<ResponseData> => {
    const url: string = `${endpoint}${queryString ? `/${queryString}` : ''}`
    await checkSessionTime()
    try {
      if (withLoader) loaderActions?.addPendingActions()

      const formattedParams = formatParams(urlParams, acceptNulls)

      const response = await instance({
        method,
        url,
        paramsSerializer: {
          serialize: (params) => QS.stringify(params, { arrayFormat: 'none' })
        },
        headers,
        params: formattedParams,
        data
      })

      const notContent = response.status === 204

      if (notContent && getItem('availableNotification')) {
        launchToast({
          title: intl.formatMessage(apiMessages.noContent),
          type: 'Warning'
        })
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const response: AxiosResponse = error.response

        const unauthorized =
          response.config.url !== 'auth/login' && response.status === 401

        if (unauthorized) {
          const errorsRegistered = Number(getItem('errorsAuthRegistered')) ?? 0
          authActions?.killSession()
          setItem('errorsAuthRegistered', errorsRegistered + 1)
        } else if (showToast) {
          /* TODO: se reactivará cuando se tengan definidas las i18Key con backend
          const i18ErrorMessage: ApiMessage =
            response?.data && response.data.i18key
              ? response.data.i18key
              : 'unexpected'
          */
          setTimeout(() => {
            launchToast({
              title:
                response?.data?.message ??
                intl.formatMessage(apiMessages.unexpected),
              type: 'Danger'
            })
          }, 500)
        }

        throw { response, error: response.status } as any
        // throw { ...response, error: response.status } as any
      }

      throw { error: 1, description: error } as any
    } finally {
      if (withLoader) loaderActions?.removePendingActions()
    }
  }

  return handleFetch
}

export const useService = (endpoint: string) => {
  return {
    get: useApi({ endpoint, method: 'get' }),
    post: useApi({ endpoint, method: 'post' }),
    patch: useApi({ endpoint, method: 'patch' }),
    put: useApi({ endpoint, method: 'put' }),
    delete: useApi({ endpoint, method: 'delete' })
  }
}

export default useApi

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { useIntl } from 'react-intl'

import { createInstance, BaseURL } from 'providers/api'
import { useLoader } from 'context/Loader'

import { apiMessages } from 'globalMessages/api'
import { GeneralParams, ResponseData } from 'types/api'
import { useAuth } from 'context/Auth'
import { getItem, setItem } from 'utils/persistentStorage'
import useToast from './useToast'

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
}

type ApiMessage = keyof typeof apiMessages

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

  const handleFetch = async (
    { body, queryString, urlParams }: Fetch = {},
    headers?: Partial<AxiosRequestHeaders>
  ): Promise<ResponseData> => {
    const url: string = `${endpoint}${queryString ? `/${queryString}` : ''}`

    try {
      if (withLoader) loaderActions?.showLoader()

      const response = await instance({
        method,
        url,
        headers,
        /*
        paramsSerializer: (params) => {
          return QueryString.stringify(params, { arrayFormat: 'repeat' })
        },
        */
        ...(urlParams
          ? acceptNulls
            ? { params: urlParams }
            : {
                params: Object.keys(urlParams).reduce((acum, key) => {
                  if (
                    urlParams[key] !== null &&
                    typeof urlParams[key] !== 'undefined'
                  ) {
                    acum[key] = urlParams[key]
                  }
                  return acum
                }, {})
              }
          : {}),
        ...(body ? { data: body } : {})
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
        } else {
          const i18ErrorMessage: ApiMessage =
            response?.data && response.data.i18key
              ? response.data.i18key
              : 'unexpected'
          setTimeout(() => {
            launchToast({
              title: intl.formatMessage(apiMessages[i18ErrorMessage]),
              type: 'Danger'
            })
          }, 500)
        }

        throw { response, error: response.status } as any
        // throw { ...response, error: response.status } as any
      }

      throw { error: 1, description: error } as any
    } finally {
      if (withLoader) loaderActions?.hideLoader()
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

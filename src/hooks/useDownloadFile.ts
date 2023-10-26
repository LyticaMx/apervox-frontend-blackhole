/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { useIntl } from 'react-intl'
import mutexify from 'mutexify/promise'
import QS from 'query-string'

import { createInstance, BaseURL } from 'providers/api'
import { useLoader } from 'context/Loader'

import { apiMessages } from 'globalMessages/api'
import { GeneralParams } from 'types/api'
import { useAuth } from 'context/Auth'
import { getItem, setItem } from 'utils/persistentStorage'
import useToast from './useToast'
import { formatParams } from 'utils/formatParams'
import mimeDB from 'types/mime-db.json'

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

const useDownloadFile = ({
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
    fileName: string,
    { body: data, queryString, urlParams, showToast = true }: Fetch = {},
    headers?: Partial<AxiosRequestHeaders>
  ): Promise<boolean> => {
    const url: string = `${endpoint}${queryString ? `/${queryString}` : ''}`
    const release = await lock()
    try {
      if (withLoader) loaderActions?.showLoader()

      const formattedParams = formatParams(urlParams, acceptNulls)

      const response = await instance({
        method,
        url,
        paramsSerializer: {
          serialize: (params) => QS.stringify(params, { arrayFormat: 'none' })
        },
        headers,
        params: formattedParams,
        data,
        responseType: 'arraybuffer' // No olvidar este nunca para las descargas
      })

      const notContent = response.status === 204

      if (notContent && getItem('availableNotification')) {
        launchToast({
          title: intl.formatMessage(apiMessages.noContentToDownload),
          type: 'Warning'
        })

        return false
      }

      try {
        const contentType = response.headers['content-type']
        const link = document.createElement('a')
        const downloadUrl = URL.createObjectURL(
          new Blob([response.data], {
            type: contentType
          })
        )
        link.href = downloadUrl
        link.download = `${fileName}.${mimeDB[contentType ?? ''] ?? 'unknown'}`
        document.body.appendChild(link)
        link.click()
        link.remove()
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 5000)
      } catch (e) {
        console.error('An error ocurred while downloading file')
        console.error(e)
        return false
      }

      return true
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
      if (withLoader) loaderActions?.hideLoader()
      release()
    }
  }

  return handleFetch
}

export default useDownloadFile

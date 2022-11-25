/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createInstance, BaseURL } from 'providers/api'
import axios, { AxiosResponse } from 'axios'
import { useLoader } from 'context/Loader'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'
import { apiMessages } from 'messages/api'

interface Props {
  endpoint: string
  method: 'post' | 'put' | 'get' | 'delete'
  base?: BaseURL
}

interface Fetch {
  body?: object
  queryString?: string
  urlParams?: object
}

type ApiMessage = keyof typeof apiMessages

const useApi = ({ endpoint, method, base = 'default' }: Props) => {
  const { actions } = useLoader()
  const intl = useIntl()
  const instance = createInstance({ base })

  const handleFetch = async ({ body, queryString, urlParams }: Fetch = {}) => {
    const url = `${endpoint}${queryString ? `/${queryString}` : ''}`

    try {
      actions?.showLoader()

      const response = await instance[method](
        url,
        method === 'get' ? { params: urlParams } : body
      )

      const hasError = response.data.code && response.data.code !== 200

      if (hasError) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw { response }
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const response: AxiosResponse = error.response

        const i18ErrorMessage: ApiMessage =
          response?.data && response.data.i18key
            ? response.data.i18key
            : 'unexpected'

        toast.error(intl.formatMessage(apiMessages[i18ErrorMessage]))

        return { ...response, error: response.status }
      }

      return error
    } finally {
      actions?.hideLoader()
    }
  }

  return handleFetch
}

export const useService = (endpoint: string) => {
  return {
    get: useApi({ endpoint, method: 'get' }),
    post: useApi({ endpoint, method: 'post' }),
    put: useApi({ endpoint, method: 'put' }),
    delete: useApi({ endpoint, method: 'delete' })
  }
}

export default useApi

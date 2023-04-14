import { BaseURL } from 'providers/api'
import { useState } from 'react'
import { PaginationFilter } from 'types/filters'
import useApi from './useApi'
import { get } from 'lodash'

interface AsyncOptions {
  loadOptions: (search: any, loadedOptions: any) => Promise<any>
  resetPaginate: () => void
}

interface Api {
  endpoint: string
  method: 'post' | 'put' | 'get' | 'delete' | 'patch'
  base?: BaseURL
}

interface URLParams {
  [param: string]: any
}
interface Props {
  api: Api
  value: string
  label?: string
  customLabel?: (item: any) => string
  extraParams?: URLParams
  fullObject?: boolean
}

const useAsyncSelect = (props: Props): AsyncOptions => {
  const {
    api,
    value,
    label = '',
    customLabel,
    extraParams = {},
    fullObject = false
  } = props
  const [pagination, setPagination] = useState<PaginationFilter>({
    limit: 20,
    page: 1
  })
  const getService = useApi(api)

  const loadOptions = async (search, loadedOptions): Promise<any> => {
    try {
      const response = await getService({
        urlParams: { ...pagination, ...extraParams }
      })
      if (response) {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
      }
      return {
        options: response?.data.map((item) => ({
          value: get(item, value, ''),
          label: customLabel ? customLabel(item) : get(item, label, ''),
          data: fullObject ? item : undefined
        })),
        // TODO: corregir el async select
        hasMore: false //response?.page_info.has_next_page
      }
    } catch {
      return {
        loadedOptions,
        hasMore: false
      }
    }
  }

  const resetPaginate = (): void => setPagination({ ...pagination, page: 1 })

  return { loadOptions, resetPaginate }
}

export { useAsyncSelect }

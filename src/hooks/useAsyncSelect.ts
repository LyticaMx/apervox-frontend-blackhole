import { BaseURL } from 'providers/api'
import { useRef, useState } from 'react'
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
  acceptNulls?: boolean
  withLoader?: boolean
}

interface URLParams {
  [param: string]: any
}
export interface Props {
  api: Api
  value: string
  label?: string
  customLabel?: (item: any) => string
  extraParams?: URLParams
  fullObject?: boolean
  searchField?: string
}

const useAsyncSelect = (props: Props): AsyncOptions => {
  const {
    api,
    value,
    label = '',
    customLabel,
    extraParams = {},
    fullObject = false,
    searchField
  } = props
  const [pagination, setPagination] = useState<PaginationFilter>({
    limit: 20,
    page: 1
  })
  const queryRef = useRef<string>('')
  const getService = useApi(api)

  const loadOptions = async (search, loadedOptions): Promise<any> => {
    try {
      const newPagination = Object.assign({}, pagination)
      if (queryRef.current !== search) {
        newPagination.page = 1
        queryRef.current = search
      }
      if (searchField && search) extraParams[searchField] = search
      const response = await getService({
        urlParams: { ...newPagination, ...extraParams }
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
        hasMore:
          (response.page - 1) * response.limit + Number(response.data.length) <
          response.size
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

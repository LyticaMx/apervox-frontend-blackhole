import { GeneralParams } from 'types/api'

interface UrlParams extends GeneralParams {
  [param: string]: any
}

export const formatParams = (
  urlParams?: UrlParams,
  acceptNulls?: boolean
): UrlParams => {
  const formattedParams = structuredClone(urlParams) ?? {}

  for (const key in formattedParams) {
    if (
      !acceptNulls &&
      (formattedParams[key] === null ||
        typeof formattedParams[key] === 'undefined')
    ) {
      // Es seguro borrar esta línea, se desactiva el eslint
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete formattedParams[key]
    } else if (
      typeof formattedParams[key] === 'object' &&
      formattedParams[key] instanceof Date
    ) {
      formattedParams[key] = formattedParams[key].toISOString()
    }
  }

  return formattedParams
}

import { Filters, createAction } from 'types/contextReducer'
import { PaginationSortFilter } from 'types/filters'
import { VerificationLine } from 'types/verificationLine'

export enum Types {
  SET_VERIFICATION_LINES = 'verificationLines/setVerificationLines',
  SET_VERIFICATION_LINES_PAGINATION = 'verificationLines/setVerificationLinesPagination',
  SET_VERIFICATION_LINES_FILTERS = 'verificationLines/setVerificationLinesFilters'
}

export const actions = {
  setVerificationLines: createAction<
    Types,
    {
      data: VerificationLine[]
      total?: number
    }
  >(Types.SET_VERIFICATION_LINES),
  setVerificationLinePagination: createAction<Types, PaginationSortFilter>(
    Types.SET_VERIFICATION_LINES_PAGINATION
  ),
  setVerificationLineFilters: createAction<Types, Filters>(
    Types.SET_VERIFICATION_LINES_FILTERS
  )
}

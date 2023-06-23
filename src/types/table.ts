/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowData } from '@tanstack/react-table'
import { ReadOnlyNonEmptyArray } from './utils'

// Esta declaración se utiliza para integrar los filtros de columnas con valores
// estaticos

export interface TableFilterOption {
  name: string
  value: string
}

export type OnChangeTableFilter =
  | ((selectedItems: string[]) => void)
  | ((selectedItems: string[]) => Promise<void>)
  | ((selectedItems: string[]) => Promise<boolean>)

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnFilters?: {
      optionsName?: string
      options?: ReadOnlyNonEmptyArray<TableFilterOption>
      onChange: OnChangeTableFilter
      apiBackend?: string
      multiple?: boolean
    }
  }
}

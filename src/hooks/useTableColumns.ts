import { NonEmptyArray, ReadOnlyNonEmptyArray } from 'types/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useLanguage } from 'context/Language'
import { useMemo } from 'react'

const useTableColumns = <DataType>(
  columnsFactory: () => NonEmptyArray<ColumnDef<DataType>>,
  dependencies?: ReadOnlyNonEmptyArray<unknown>
): NonEmptyArray<ColumnDef<DataType>> => {
  const { localeI18n } = useLanguage()

  const dependenciesMemo = useMemo(
    () => (dependencies ? dependencies.concat([localeI18n]) : [localeI18n]),
    [dependencies, localeI18n]
  )

  const columnsMemo = useMemo(columnsFactory, dependenciesMemo)

  return columnsMemo
}

export default useTableColumns

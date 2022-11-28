import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Role } from 'types/roles'
import { messages } from '../messages'

const useColumns = (): Array<ColumnDef<Role>> => {
  const { formatMessage } = useIntl()

  const columns = useMemo<Array<ColumnDef<Role>>>(
    () => [{ accessorKey: 'name', header: formatMessage(messages.nameColumn) }],
    []
  )

  return columns
}

export { useColumns }

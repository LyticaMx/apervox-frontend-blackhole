import {
  FunctionComponent,
  ReactElement,
  SVGProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

import Pagination, { PaginationLimit } from './Pagination'
import clsx from 'clsx'
import NoData from 'components/NoData'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import Typography from 'components/Typography'
import TableConfiguration from './TableConfiguration'
import { useVirtual } from 'react-virtual'
import { useIntl } from 'react-intl'
import { messages } from './messages'

export interface ActionForSelectedItems<T> {
  name: string
  Icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>
  action:
    | ((items: T[]) => Promise<void> | Promise<boolean>)
    | ((items: T[]) => void)
  disabled?: boolean
}

export interface ManualPagination {
  currentPage: number
  totalRecords: number
  onChange: (page: number) => void
}

export interface ManualSorting {
  sorting: SortingState
  onSortingChange: (sort: SortingState) => void
}

interface Props<T> {
  data: T[]
  columns: Array<ColumnDef<T>>
  manualPagination?: ManualPagination
  paginationStyle?: 'mini' | 'extended'
  pageSize?: number
  onRowClicked?: (row: any, event: any) => void
  className?: string
  manualSorting?: ManualSorting
  maxHeight?: number
  withCheckbox?: boolean
  manualLimit?: PaginationLimit
  actionsForSelectedItems?: Array<ActionForSelectedItems<T>>
}

const Table = <DataType,>({
  data,
  columns,
  manualPagination,
  // paginationStyle: paginationType = 'mini',
  pageSize = 10,
  maxHeight = 800,
  withCheckbox = false,
  onRowClicked,
  className,
  manualSorting,
  manualLimit,
  actionsForSelectedItems
}: Props<DataType>): ReactElement => {
  const [sortingState, setSortingState] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { formatMessage } = useIntl()

  const enhancedColumns = useMemo<Array<ColumnDef<DataType>>>(() => {
    if (!withCheckbox) return columns
    const newColumns: Array<ColumnDef<DataType>> = [
      {
        id: 'checkbox',
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        )
      }
    ]
    return newColumns.concat(columns)
  }, [columns, withCheckbox])

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true, // para obtener los logs de la tabla
    manualPagination: Boolean(manualPagination),
    initialState: {
      pagination: { pageSize, pageIndex: 0 }
    },
    state: { sorting: manualSorting?.sorting, rowSelection, columnVisibility },
    manualSorting: true,
    enableSorting: !!manualSorting,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSortingState,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility
  })

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: parseInt(process.env.REACT_APP_TABLE_OVERSCAN ?? '10')
  })

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0

  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  const onChange = (page: number): void => {
    if (manualPagination) {
      manualPagination.onChange(page)
    } else {
      table.setPageIndex(page)
    }
  }

  const getOrderIcon = (order?: string): ReactElement | null => {
    if (!manualSorting) return null

    switch (order) {
      case 'asc':
        return (
          <span className="flex">
            <ArrowUpIcon className="w-4 ml-1" />
            <ArrowDownIcon className="w-4 text-gray-300" />
          </span>
        )
      case 'desc':
        return (
          <span className="flex">
            <ArrowUpIcon className="w-4 ml-1 text-gray-300" />
            <ArrowDownIcon className="w-4" />
          </span>
        )
      default:
        return (
          <span className="flex">
            <ArrowUpIcon className="w-4 ml-1 text-gray-300" />
            <ArrowDownIcon className="w-4 text-gray-300" />
          </span>
        )
    }
  }

  const onChangeColumnVisibility = useCallback(
    (newColumnVisibility: VisibilityState): void => {
      if (
        JSON.stringify(columnVisibility) !== JSON.stringify(newColumnVisibility)
      ) {
        setColumnVisibility(newColumnVisibility)
      }
    },
    [columnVisibility]
  )

  const selectedKeys = useMemo<number[]>(
    () => Object.keys(rowSelection).map((item) => +item),
    [JSON.stringify(rowSelection)]
  )

  const selectedItems = useMemo<string>(() => {
    const value = selectedKeys.length
    if (value === 0) return 'none'
    else if (value === 1) return 'one'
    else if (value === data.length) return 'all'
    return `${value}`
  }, [JSON.stringify(selectedKeys)])

  useEffect(
    () => {
      if (
        JSON.stringify(manualSorting?.sorting) !== JSON.stringify(sortingState)
      ) {
        manualSorting?.onSortingChange(sortingState)
      }
    },
    // Se necesita volver string debido a los valores del sortingState
    // se encuentran en un arreglo y con esto se evitan dobles renders
    [JSON.stringify(sortingState)]
  )

  useEffect(() => {
    if (
      manualSorting &&
      JSON.stringify(manualSorting?.sorting) !== JSON.stringify(sortingState)
    ) {
      setSortingState(manualSorting.sorting)
    }
  }, [JSON.stringify(manualSorting?.sorting)])

  useEffect(() => {
    if (!withCheckbox) return
    if (Object.keys(rowSelection).length > 0) setRowSelection({})
  }, [manualPagination?.currentPage, table.getState().pagination.pageIndex])

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-t-lg overflow-x-auto overflow-y-hidden">
        <div className="h-[45px] flex center justify-between px-6 py-2">
          <Typography>
            {selectedItems !== 'none' &&
              formatMessage(messages.selectedElements, {
                selectedItems
              })}
          </Typography>
          <div className="flex items-center">
            <div className="mr-4 last:mr-0">
              {selectedItems !== 'none' && actionsForSelectedItems
                ? actionsForSelectedItems.map((item, index) => (
                    <button
                      onClick={async () =>
                        await item.action(
                          data.filter((datum, index) =>
                            selectedKeys.includes(index)
                          )
                        )
                      }
                      key={`${item.name}-${index}`}
                      disabled={item.disabled}
                      className=" transition-colors text-secondary-gray hover:text-primary  mr-2"
                    >
                      <item.Icon className="w-4 h-4" />
                    </button>
                  ))
                : null}
            </div>
            <TableConfiguration
              table={table}
              onChangeColumnVisibility={onChangeColumnVisibility}
            />
          </div>
        </div>
        <div
          ref={tableContainerRef}
          style={{ maxHeight }}
          className="overflow-auto"
        >
          {table.getRowModel().rows.length ? (
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 sticky top-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              onClick={header.column.getToggleSortingHandler()}
                              className={clsx(
                                manualSorting &&
                                  'cursor-pointer flex select-none'
                              )}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.columnDef.header !== ' ' &&
                              header.column.columnDef.header !== '' &&
                              header.column.columnDef.enableSorting !== false
                                ? getOrderIcon(
                                    header.column.getIsSorted() as string
                                  )
                                : ''}
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paddingTop > 0 && (
                  <tr>
                    <td style={{ height: `${paddingTop}px` }} />
                  </tr>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index]

                  return (
                    <tr
                      key={row.id}
                      ref={virtualRow.measureRef}
                      className={clsx(
                        onRowClicked && 'cursor-pointer hover:bg-slate-100'
                      )}
                      onClick={(event: any) => {
                        if (onRowClicked) {
                          onRowClicked(row.original, event)
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900 sm:pl-6"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
                {paddingBottom > 0 && (
                  <tr>
                    <td style={{ height: `${paddingBottom}px` }} />
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
      <Pagination
        onPageChange={onChange}
        currentPage={
          manualPagination
            ? manualPagination.currentPage
            : table.getState().pagination.pageIndex
        }
        pageSize={pageSize}
        totalCount={
          manualPagination ? manualPagination.totalRecords : data.length
        }
        manualLimit={manualLimit}
      />
    </div>
  )
}

export default Table

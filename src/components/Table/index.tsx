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
import ColumnFilter from './ColumnFilter'
import Tooltip from 'components/Tooltip'

export interface ActionForSelectedItems<T> {
  name: string
  tooltip?: string
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
  onRowClicked?: (row: T, event: any) => void
  className?: string
  manualSorting?: ManualSorting
  enableSorting?: boolean
  maxHeight?: number
  withCheckbox?: boolean
  manualLimit?: PaginationLimit
  actionsForSelectedItems?: Array<ActionForSelectedItems<T>>
  rowConfig?: {
    paddingSize?: 'xs' | 'sm' | 'md'
    className?: string
  }
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
  enableSorting = true,
  manualLimit,
  actionsForSelectedItems,
  rowConfig
}: Props<DataType>): ReactElement => {
  const [sortingState, setSortingState] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const manualSortingRef = useRef(manualSorting?.onSortingChange)

  useEffect(() => {
    manualSortingRef.current = manualSorting?.onSortingChange
  }, [manualSorting?.onSortingChange])

  const { formatMessage } = useIntl()

  const rowPadding = useMemo(
    () => ({
      xs: 'py-1 px-0.5',
      sm: 'py-2 px-1.5',
      md: 'py-4 px-3'
    }),
    []
  )

  const checkboxPadding = useMemo(
    () => ({
      xs: 'py-1 px-1',
      sm: 'py-2 px-1.5',
      md: 'py-4 px-3'
    }),
    []
  )

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

  const onSorting = (callback): void => {
    const sortedCb = callback(manualSorting?.sorting ?? sortingState)

    if (manualSorting) manualSortingRef.current?.(sortedCb)
    else setSortingState(callback)
  }

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true, // para obtener los logs de la tabla
    manualPagination: !!manualPagination,
    initialState: {
      pagination: { pageSize, pageIndex: 0 }
    },
    state: {
      sorting: manualSorting?.sorting ?? sortingState,
      rowSelection,
      columnVisibility
    },
    manualSorting: !!manualSorting,
    enableSorting,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: onSorting,
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
            <ArrowUpIcon className="w-4 ml-1 text-primary-500" />
            <ArrowDownIcon className="w-4 text-gray-300" />
          </span>
        )
      case 'desc':
        return (
          <span className="flex">
            <ArrowUpIcon className="w-4 ml-1 text-gray-300" />
            <ArrowDownIcon className="w-4 text-primary-500" />
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

  useEffect(() => {
    if (!withCheckbox) return
    if (Object.keys(rowSelection).length > 0) setRowSelection({})
  }, [manualPagination?.currentPage, table.getState().pagination.pageIndex])

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-t-lg overflow-x-auto overflow-y-hidden">
        <div className="h-[45px] flex center justify-between px-6 py-2 bg-gray-50">
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
                    <Tooltip
                      key={`${item.name}-${index}`}
                      content={item.tooltip ?? formatMessage(messages.action)}
                      floatProps={{ offset: 10, arrow: true }}
                      classNames={{
                        panel:
                          'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                        arrow:
                          'absolute bg-white w-2 h-2 rounded-full bg-secondary'
                      }}
                      placement="top"
                    >
                      <button
                        onClick={async () => {
                          const unselect = await item.action(
                            data.filter((datum, index) =>
                              selectedKeys.includes(index)
                            )
                          )
                          if (unselect) setRowSelection({})
                        }}
                        disabled={item.disabled}
                        className="transition-colors text-secondary-gray hover:text-primary  mr-2"
                      >
                        <item.Icon className="w-4 h-4" />
                      </button>
                    </Tooltip>
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
          className="overflow-auto transition-[max-height] duration-300"
        >
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50 sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <th
                        className={clsx(
                          'text-left text-sm font-semibold text-gray-900 whitespace-nowrap uppercase',
                          index === 0 && withCheckbox
                            ? checkboxPadding[rowConfig?.paddingSize ?? 'xs']
                            : rowPadding[rowConfig?.paddingSize ?? 'xs']
                        )}
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={header.column.getToggleSortingHandler()}
                            className={clsx(
                              'flex',
                              (!!manualSorting ||
                                !!header.column.columnDef.meta) &&
                                'cursor-pointer select-none items-center',
                              index === 0 && withCheckbox && 'justify-center'
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
                            {header.column.columnDef.meta?.columnFilters ? (
                              <ColumnFilter
                                onChange={
                                  header.column.columnDef.meta.columnFilters
                                    .onChange
                                }
                                options={
                                  header.column.columnDef.meta.columnFilters
                                    .options
                                }
                                optionsTitle={
                                  header.column.columnDef.meta.columnFilters
                                    .optionsName
                                }
                                multiple={
                                  header.column.columnDef.meta.columnFilters
                                    .multiple
                                }
                              />
                            ) : null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.length ? (
                <>
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
                          event.stopPropagation()
                          if (onRowClicked) {
                            onRowClicked(row.original, event)
                          }
                        }}
                      >
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <td
                              key={cell.id}
                              className={clsx(
                                'whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900',
                                index === 0 && withCheckbox
                                  ? checkboxPadding[
                                      rowConfig?.paddingSize ?? 'xs'
                                    ]
                                  : rowPadding[rowConfig?.paddingSize ?? 'xs'],
                                rowConfig?.className,
                                index === 0 && withCheckbox && 'text-center'
                              )}
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
                </>
              ) : (
                <tr>
                  <td colSpan={enhancedColumns.length}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

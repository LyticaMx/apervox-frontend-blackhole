import { ReactElement, useEffect, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'

import Pagination from './Pagination'
import clsx from 'clsx'
import NoData from 'components/NoData'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

export interface ManualPagination {
  currentPage: number
  totalRecords: number
  onChange: (page: number) => void
}

export interface ManualSorting {
  sorting: SortingState
  onSortingChange: (sort: SortingState) => void
}

interface Props {
  data: any[]
  columns: any[]
  manualPagination?: ManualPagination
  paginationStyle?: 'mini' | 'extended'
  pageSize?: number
  onRowClicked?: (row: any, event: any) => void
  className?: string
  manualSorting?: ManualSorting
}

const Table = ({
  data,
  columns,
  manualPagination,
  // paginationStyle: paginationType = 'mini',
  pageSize = 10,
  onRowClicked,
  className,
  manualSorting
}: Props): ReactElement => {
  const [sortingState, setSortingState] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    manualPagination: Boolean(manualPagination),
    initialState: {
      pagination: { pageSize, pageIndex: 0 }
    },
    state: { sorting: manualSorting?.sorting },
    manualSorting: true,
    enableSorting: !!manualSorting,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSortingState
  })

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

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-t-lg overflow-x-auto overflow-y-hidden">
        {table.getRowModel().rows.length ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
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
                              manualSorting && 'cursor-pointer flex select-none'
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.columnDef.header !== ' ' &&
                            header.column.columnDef.header !== ''
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
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
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
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
      {/* {paginationType && ( */}
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
        // paginationType={paginationType}
      />
      {/* )} */}
    </div>
  )
}

export default Table

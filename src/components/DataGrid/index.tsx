import { ReactElement, useRef, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'
import clsx from 'clsx'
import { config } from 'providers/config'
import PaginationComponent from './Pagination'
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from '@heroicons/react/20/solid'

export interface Pagination {
  currentPage: number
  currentSize: number
  totalRecords: number
  onChange: (page: number) => void
  onChangeSize: (page: number) => void
}

interface Props<T> {
  columns: Array<ColumnDef<T>>
  data: T[]
  height: number
  pagination: Pagination
  totalItems: number
  debug?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

const DataGrid = <DataType,>(props: Props<DataType>): ReactElement => {
  const {
    columns,
    data,
    height,
    totalItems,
    debug = false,
    textAlign = 'left',
    pagination
  } = props
  const [sorting, setSorting] = useState<SortingState>([])
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: debug
  })
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: config.appConfig.virtualizedTableOverscan
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  const sortIcons = {
    asc: <ArrowSmallUpIcon />,
    desc: <ArrowSmallDownIcon />
  }

  const headerAlign = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  const onChange = (page: number): void => {
    console.log(page)
    pagination.onChange(page)
  }

  return (
    <div className="p-4 rounded-lg shadow-lg shadow-gray-300">
      <div
        ref={tableContainerRef}
        style={{ height }}
        className="container overflow-auto"
      >
        <table className="table-auto w-full ">
          <thead className="sticky top-0 font-semibold text-gray-400 bg-gray-50 uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className="p-2 whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={clsx(
                          header.column.getCanSort() &&
                            'cursor-pointer select-none',
                          `text-${textAlign}`,
                          headerAlign[textAlign],
                          'font-semibold',
                          'flex',
                          'items-center'
                        )}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <span className="w-5 h-5">
                          {sortIcons[header.column.getIsSorted() as string] ??
                            null}
                        </span>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
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
                  className="hover:bg-slate-100 transition-colors duration-300 ease-in-out"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={clsx('p-2', `text-${textAlign}`)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
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
      </div>
      <div className="pt-2">
        <hr />
        <PaginationComponent
          onPageChange={onChange}
          currentPage={pagination.currentPage}
          pageSize={pagination.currentSize}
          totalCount={totalItems}
          onPageSizeChange={pagination.onChangeSize}
        />
      </div>
    </div>
  )
}

export default DataGrid

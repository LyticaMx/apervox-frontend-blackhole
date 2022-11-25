import { ReactElement } from 'react'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { usePagination, DOTS } from './hooks/usePagination'
import { useIntl } from 'react-intl'
import { messages } from './messages'

interface Props {
  onPageChange: (currentPage: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  onPageSizeChange: (currentSize: number) => void
  pageSizeOptions?: number[]
  className?: string
}

const Pagination = (props: Props): ReactElement | null => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    onPageSizeChange,
    className,
    pageSizeOptions = [10, 25, 50, 100, 150]
  } = props
  const paginationRange = usePagination({
    currentPage: currentPage + 1,
    totalCount,
    siblingCount,
    pageSize
  })
  const { formatMessage } = useIntl()

  const onNext = (): void => {
    if (currentPage + 1 !== lastPage) {
      onPageChange(currentPage + 1)
    }
  }

  const onPrevious = (): void => {
    if (currentPage !== 0) {
      onPageChange(currentPage - 1)
    }
  }

  const onSizeChange = (e): void => {
    onPageChange(0)
    onPageSizeChange(+e.target.value)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div>
        <p className="text-sm text-gray-700 mt-1">
          {formatMessage(
            paginationRange.length === 0
              ? messages.noResults
              : messages.totalCount,
            {
              from: currentPage * pageSize + 1,
              to:
                totalCount < currentPage * pageSize + pageSize
                  ? totalCount
                  : currentPage * pageSize + pageSize,
              of: totalCount
            }
          )}
        </p>
      </div>
      <div className="flex my-3 pl-5">
        <div
          className={clsx(
            'flex rounded-md shadow-sm w-max text-sm font-medium text-gray-500',
            className && className
          )}
        >
          <button
            className={clsx(
              'p-2 border border-gray-300 hover:bg-gray-50 rounded-l-md disabled:text-gray-300 disabled:hover:bg-inherit'
            )}
            onClick={onPrevious}
            disabled={currentPage === 0 || paginationRange.length === 0}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <div
                  className="py-2 px-4 border border-gray-300 flex justify-center items-center"
                  key={index}
                >
                  &#8230;
                </div>
              )
            }

            return (
              <button
                key={index}
                className={clsx(
                  'py-2 px-4 border border-gray-300 relative inline-flex',
                  pageNumber === currentPage + 1
                    ? 'border border-indigo-500 bg-indigo-50 text-indigo-600'
                    : 'hover:bg-gray-50'
                )}
                onClick={() => onPageChange(pageNumber - 1)}
              >
                {pageNumber}
              </button>
            )
          })}
          <button
            className="p-2 border border-gray-300 hover:bg-gray-50 rounded-r-md disabled:text-gray-300 disabled:hover:bg-inherit"
            onClick={onNext}
            disabled={
              currentPage + 1 === lastPage || paginationRange.length === 0
            }
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="w-32 ml-2">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
            value={pageSize}
            onChange={onSizeChange}
          >
            {pageSizeOptions.map((option) => (
              <option selected key={option} value={option}>
                {formatMessage(messages.paginationOption, { option })}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Pagination

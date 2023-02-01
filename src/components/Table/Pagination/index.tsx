import { ReactElement } from 'react'
import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { usePagination, DOTS } from './hooks/usePagination'
import { useIntl } from 'react-intl'
import { messages } from '../messages'

interface Props {
  onPageChange: (currentPage: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
  // paginationType: 'mini' | 'extended'
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className
}: // paginationType
Props): ReactElement | null => {
  const { formatMessage } = useIntl()
  const paginationRange = usePagination({
    currentPage: currentPage + 1,
    totalCount,
    siblingCount,
    pageSize
  })

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

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className="flex flex-col items-end my-3 pl-5">
      {paginationRange.length > 1 && (
        <div
          className={clsx(
            'flex rounded-md shadow-sm w-max text-sm font-medium text-gray-500',
            className && className
          )}
        >
          <button
            className={clsx(
              'p-1.5 border border-gray-300 hover:bg-gray-50 rounded-l-md disabled:text-gray-300 disabled:hover:bg-inherit'
            )}
            onClick={onPrevious}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <div
                  className="py-1.5 px-2.5 border border-gray-300 flex justify-center items-center"
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
                  'py-1.5 px-2.5 border border-gray-300 relative inline-flex',
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
          {/* {paginationType === 'extended' ? (
        ) : (
          <div className="py-2 px-4 border border-gray-300 flex justify-center items-center">
            {currentPage + 1}
          </div>
        )} */}
          <button
            className="p-1.5 border border-gray-300 hover:bg-gray-50 rounded-r-md disabled:text-gray-300 disabled:hover:bg-inherit"
            onClick={onNext}
            disabled={currentPage + 1 === lastPage}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
      {totalCount !== 0 ? (
        <p className="text-sm text-gray-700 mt-1">
          {formatMessage(messages.paginationResults, {
            from: currentPage * pageSize + 1,
            to:
              currentPage * pageSize + pageSize > totalCount
                ? totalCount
                : currentPage * pageSize + pageSize,
            of: totalCount
          })}
        </p>
      ) : null}
    </div>
  )
}

export default Pagination

import { ReactElement, useMemo } from 'react'
import clsx from 'clsx'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'

import { usePagination, DOTS } from './hooks/usePagination'
import Typography from 'components/Typography'
import SelectField from 'components/Form/Select'
// TODO se comenta el cuantos elementos se encontraron
import { useIntl } from 'react-intl'
import { messages } from '../messages'
import { NonEmptyArray } from 'types/utils'

export interface PaginationLimit {
  options: NonEmptyArray<number>
  current: number
  onChangeLimit: (currentPage: number, limit: number) => void
}
interface Props {
  onPageChange: (currentPage: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number // Encontrar una manera de utilizar este o limit en caso contrario para la división
  pageSize: number
  className?: string
  limit?: PaginationLimit

  // paginationType: 'mini' | 'extended'
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  limit = {
    options: [10],
    current: 10,
    onChangeLimit: (current, limit) => {}
  }
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

  const goToStart = (): void => {
    if (currentPage !== 0) onPageChange(0)
  }

  const onPrevious = (): void => {
    if (currentPage !== 0) {
      onPageChange(currentPage - 1)
    }
  }

  const goToEnd = (): void => {
    if (currentPage + 1 < lastPage) onPageChange(lastPage - 1)
  }

  const onChangeLimit = (newLimit: number): void => {
    if (limit.current !== newLimit) {
      limit.onChangeLimit(0, newLimit)
    }
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  const limitOptions = useMemo(
    () =>
      limit.options.map((limit) => ({
        text: `${limit}`,
        value: limit
      })),
    [limit.options]
  )

  return (
    <div className="flex my-3 pl-5 items-center">
      {paginationRange.length > 0 && (
        <div
          className={clsx(
            'flex rounded-md shadow-sm w-max text-sm font-medium text-gray-500',
            className && className
          )}
        >
          <button
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit"
            disabled={currentPage === 0}
            onClick={goToStart}
          >
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit"
            onClick={onPrevious}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <div
                  className="p-1 flex justify-center items-center select-none"
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
                  'p-1 shadow-none inline-flex',
                  pageNumber === currentPage + 1
                    ? 'text-primary font-semibold'
                    : 'text-secondary-gray hover:text-primary'
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
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit disabled:"
            onClick={onNext}
            disabled={currentPage + 1 === lastPage}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit"
            disabled={currentPage + 1 === lastPage}
            onClick={goToEnd}
          >
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}

      <Typography variant="caption" className="ml-5">
        {formatMessage(messages.rowsPerPage)}
      </Typography>
      <div className="w-14 ml-4">
        <SelectField
          items={limitOptions}
          value={limit.current}
          size="sm"
          onChange={onChangeLimit}
        />
      </div>

      {/*
      totalCount !== 0 ? (
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
      ) : null
      */}
    </div>
  )
}

export default Pagination

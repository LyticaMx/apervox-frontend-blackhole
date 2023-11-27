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
import { paginationMessages } from '../messages'
import { NonEmptyArray } from 'types/utils'

interface ClassNames {
  container?: string
  pagination?: string
  text?: string
  select?: string
}
export interface PaginationLimit {
  options: NonEmptyArray<number>
  onChangeLimit: (currentPage: number, limit: number) => void
}
interface Props {
  onPageChange: (currentPage: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: ClassNames
  manualLimit?: PaginationLimit
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  manualLimit = {
    options: [10, 25, 50],
    onChangeLimit: (current, limit) => {}
  }
}: Props): ReactElement | null => {
  const { formatMessage } = useIntl()
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  const onNext = (): void => {
    if (currentPage < lastPage) {
      onPageChange(currentPage) // Esta con 0
    }
  }

  const goToStart = (): void => {
    if (currentPage > 1) onPageChange(0)
  }

  const onPrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 2) // La pagina debe ser -2 porque se suma +1 en las funciones de llamada
    }
  }

  const goToEnd = (): void => {
    if (currentPage < lastPage) onPageChange(lastPage - 1)
  }

  const onChangeLimit = (newLimit: number): void => {
    if (pageSize !== newLimit) {
      manualLimit.onChangeLimit(0, newLimit)
    }
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  const limitOptions = useMemo(
    () =>
      manualLimit.options.map((limit) => ({
        text: `${limit}`,
        value: limit
      })),
    [manualLimit?.options]
  )

  return (
    <div className={clsx('flex my-3 pl-5 items-center', className?.container)}>
      {paginationRange.length > 0 && (
        <div
          className={clsx(
            'flex rounded-md shadow-sm w-max text-sm font-medium text-gray-500',
            className?.pagination
          )}
        >
          <button
            type="button"
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit"
            disabled={currentPage === 1}
            onClick={goToStart}
          >
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit"
            onClick={onPrevious}
            disabled={currentPage === 1}
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
                type="button"
                key={index}
                className={clsx(
                  'p-1 shadow-none inline-flex',
                  pageNumber === currentPage
                    ? 'text-primary font-semibold'
                    : 'text-secondary-gray hover:text-primary'
                )}
                onClick={() => onPageChange(pageNumber - 1)}
              >
                {pageNumber}
              </button>
            )
          })}
          <button
            type="button"
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit disabled:"
            onClick={onNext}
            disabled={currentPage === lastPage}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="p-1 hover:text-primary hover:font-semibold disabled:text-secondary-gray disabled:hover:bg-inherit"
            disabled={currentPage === lastPage}
            onClick={goToEnd}
          >
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}

      <Typography variant="caption" className={clsx('ml-5', className?.text)}>
        {formatMessage(paginationMessages.rowsPerPage)}
      </Typography>
      <div className={clsx('w-14 ml-4', className?.select)}>
        <SelectField
          items={limitOptions}
          value={pageSize}
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

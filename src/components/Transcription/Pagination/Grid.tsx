import { ReactElement, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Button from 'components/Button'
import clsx from 'clsx'
import Typography from 'components/Typography'

interface Props {
  items: string[][]
  onClick: (index: number, page: number, item: any) => void
  currentItem: string
  currentPage: number
}

const Grid = (props: Props): ReactElement => {
  const { items, onClick, currentItem, currentPage } = props
  const [page, setPage] = useState<number>(currentPage)

  return (
    <div>
      <div className="flex place-content-between">
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 0}
          className="rounded-full border border-gray-300 hover:bg-gray-100 disabled:border-none disabled:text-gray-300 disabled:hover:bg-inherit"
        >
          <ChevronLeftIcon className="h-7 w-7" />
        </button>
        <Typography variant="body2">{`${items[page][0].split('-')[0]} - ${
          items[page][items[page].length - 1].split('-')[1]
        }`}</Typography>
        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={page + 1 === items.length}
          className="rounded-full border border-gray-300 hover:bg-gray-100 disabled:border-none disabled:text-gray-300 disabled:hover:bg-inherit"
        >
          <ChevronRightIcon className="h-7 w-7" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 h-30">
        {items[page].map(
          (item, index): ReactElement => (
            <Button
              key={item}
              onClick={() => onClick(index, page, item)}
              className={clsx({
                '!bg-gray-100': currentItem === item
              })}
            >
              {item}
            </Button>
          )
        )}
      </div>
    </div>
  )
}

export default Grid

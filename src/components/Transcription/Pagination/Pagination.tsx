import Button from 'components/Button'
import Popover from 'components/Popover'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { chunkArray } from 'utils/chunkArray'
import { getAudioIntervals } from 'utils/getAudioRanges'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Grid from './Grid'

interface Audio {
  duration: number
  currentTime: number
}

interface Props {
  audio: Audio
  onPageChange?: (id: string) => void
}

const Pagination = (props: Props): ReactElement => {
  const {
    audio: { duration, currentTime },
    onPageChange
  } = props

  const [intervals, setIntervals] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const defaultTime =
    parseInt(process.env.REACT_APP_TIME_PER_TRANSCRIPTION_PAGE ?? '', 10) || 30
  const ITEMS_PER_PAGE =
    parseInt(process.env.REACT_APP_ITEMS_PER_TRANSCRIPTION_PAGE ?? '', 10) || 9

  const createIntervals = (): void => {
    const newIntervals = getAudioIntervals(duration)
    setIntervals(newIntervals)
    setCurrentPage(0)
    setSelectedItem(0)
  }

  useEffect(() => {
    createIntervals()
  }, [duration])

  useEffect(() => {
    if (intervals.length === 0) return
    if (onPageChange) onPageChange(intervals[selectedItem])
  }, [intervals, selectedItem])

  useEffect(() => {
    // current time divided by default time
    const ctDt = Math.ceil(currentTime / defaultTime)
    if (ctDt === 0) {
      setSelectedItem(0)
      return
    }
    setSelectedItem(ctDt - 1)
  }, [currentTime])

  const chunkedIntervals = useMemo(
    () => chunkArray<string>(intervals, 9),
    [intervals]
  )

  return (
    <div className="flex place-content-between items-center w-60">
      <button
        onClick={() => setSelectedItem((item) => item - 1)}
        disabled={selectedItem === 0}
        className="rounded-full border border-gray-300 hover:bg-gray-100 disabled:border-none disabled:text-gray-300 disabled:hover:bg-inherit h-7 w-7"
      >
        <ChevronLeftIcon />
      </button>
      <Popover
        content={
          <Grid
            items={chunkedIntervals}
            onClick={(index, page) => {
              setSelectedItem(index + page * ITEMS_PER_PAGE)
              setCurrentPage(page)
            }}
            currentItem={intervals[selectedItem]}
            currentPage={currentPage}
          />
        }
      >
        <Button variant="outlined">{intervals[selectedItem]}</Button>
      </Popover>
      <button
        onClick={() => setSelectedItem((item) => item + 1)}
        disabled={selectedItem + 1 === intervals.length}
        className="rounded-full border border-gray-300 hover:bg-gray-100 disabled:border-none disabled:text-gray-300 disabled:hover:bg-inherit h-7 w-7"
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

export default Pagination

import { ReactElement } from 'react'
import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'
import LinearProgress from 'components/Progress/Linear'
import { formatSeconds } from 'utils/formatTime'

interface Props {
  isReady: boolean
  isPlaying: boolean
  duration: number
  process: number
  onPlayPause: () => void
  onBackward: () => void
  onForward: () => void
}

const PlayButtons = ({
  isReady,
  isPlaying,
  duration,
  process,
  onPlayPause,
  onForward,
  onBackward
}: Props): ReactElement => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        <button
          disabled={!isReady}
          onClick={() => {
            onBackward()
          }}
          className="text-muted hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300"
        >
          <BackwardIcon className="w-5 h-5" />
        </button>
        <button
          disabled={!isReady}
          onClick={onPlayPause}
          className="text-muted hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300"
        >
          {isPlaying ? (
            <PauseCircleIcon className="w-8 h-8" />
          ) : (
            <PlayCircleIcon className="w-8 h-8" />
          )}
        </button>
        <button
          disabled={!isReady}
          onClick={() => {
            onForward()
          }}
          className="text-muted hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300"
        >
          <ForwardIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="py-3 flex items-center w-full text-white text-sm">
        {formatSeconds(parseInt(String(process)))}
        <div className="px-5 w-full">
          <LinearProgress
            value={process}
            max={duration}
            bgContainer="bg-white"
            bgProgress="bg-primary"
            className="h-0.5"
          />
        </div>
        {formatSeconds(duration)}
      </div>
    </div>
  )
}

export default PlayButtons

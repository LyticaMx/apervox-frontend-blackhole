import { ReactElement } from 'react'
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon
} from '@heroicons/react/20/solid'

interface Props {
  isReady: boolean
  isPlaying: boolean
  onPlayPause: () => void
  onBackward: () => void
  onForward: () => void
}

const PlayButtons = ({
  isReady,
  isPlaying,
  onPlayPause,
  onForward,
  onBackward
}: Props): ReactElement => {
  return (
    <div className="w-full px-4 flex justify-evenly">
      <button
        disabled={!isReady}
        onClick={onBackward}
        className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300"
      >
        <BackwardIcon className="w-7 h-7" />
      </button>
      <button
        disabled={!isReady}
        onClick={onPlayPause}
        className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300"
      >
        {isPlaying ? (
          <PauseIcon className="w-7 h-7" />
        ) : (
          <PlayIcon className="w-7 h-7" />
        )}
      </button>
      <button
        disabled={!isReady}
        onClick={onForward}
        className="text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300"
      >
        <ForwardIcon className="w-7 h-7" />
      </button>
    </div>
  )
}

export default PlayButtons

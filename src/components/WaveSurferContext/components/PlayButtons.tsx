import { ReactElement } from 'react'
import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'
import { formatSeconds } from 'utils/formatTime'
import ProgressBar from './ProgressBar'
import useWavesurferContext from '../hooks/useWavesurferContext'

const PlayButtons = (): ReactElement => {
  const { isReady, controls } = useWavesurferContext()

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        <button
          disabled={!isReady}
          onClick={() => {
            controls.skipBackward()
          }}
          className="text-muted hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300"
        >
          <BackwardIcon className="w-5 h-5" />
        </button>
        <button
          disabled={!isReady}
          onClick={() => {
            controls.playPause()
          }}
          className="text-muted hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300"
        >
          {controls.isPlaying ? (
            <PauseCircleIcon className="w-8 h-8" />
          ) : (
            <PlayCircleIcon className="w-8 h-8" />
          )}
        </button>
        <button
          disabled={!isReady}
          onClick={() => {
            controls.skipForward()
          }}
          className="text-muted hover:text-white disabled:text-gray-300 disabled:hover:text-gray-300"
        >
          <ForwardIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="py-3 flex items-center w-full text-white text-sm">
        {formatSeconds(0)}
        <div className="px-5 w-full">
          <ProgressBar
            currentTime={controls.audioProcess}
            duration={controls.duration}
            onClick={(value) => {
              controls.seekTo(value)
              controls.play()
            }}
          />
        </div>
        {formatSeconds(controls.duration)}
      </div>
    </div>
  )
}

export default PlayButtons

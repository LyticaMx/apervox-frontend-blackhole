import { ReactElement } from 'react'
import { PlayCircleIcon, StopCircleIcon } from '@heroicons/react/24/outline'

interface Props {
  isPlaying: boolean
  onClick: () => void
}
const AudioButton = ({ isPlaying, onClick }: Props): ReactElement => {
  if (!isPlaying) {
    return (
      <PlayCircleIcon
        className="w-5 h-5 text-gray-500 cursor-pointer"
        onClick={() => onClick()}
      />
    )
  } else {
    return (
      <StopCircleIcon
        className="w-5 h-5 text-gray-500 cursor-pointer"
        onClick={() => onClick()}
      />
    )
  }
}

export default AudioButton

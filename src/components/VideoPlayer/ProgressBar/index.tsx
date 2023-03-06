import {
  MouseEvent,
  ReactElement,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { videoDurationToString } from 'utils/timeToString'
import { PlayerReference } from 'video-react'

interface Props {
  duration: number
  currentTime: number
  buffered?: Record<any, any>
  playerRef: RefObject<PlayerReference>
}

const ProgressBar = (props: Props): ReactElement => {
  const { duration, currentTime, playerRef, buffered } = props
  const [mouseLeft, setMouseLeft] = useState<number>(0)
  const [mouseTime, setMouseTime] = useState<number>(0)
  const progressRef = useRef<HTMLDivElement>(null)

  const handleSeek = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !playerRef.current) return

      const progressTime =
        (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * duration

      playerRef.current.seek(progressTime)
    },
    [duration]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || duration === undefined) return
      const aux =
        Math.abs(e.clientX - progressRef.current.getBoundingClientRect().left) /
        progressRef.current.offsetWidth
      setMouseLeft(aux * 100)
      setMouseTime(aux * duration)
    },
    [duration]
  )

  const playerPercent = useMemo(() => {
    return duration === currentTime
      ? 100
      : +((currentTime * 100) / duration).toFixed(2)
  }, [currentTime, duration])

  const bufferedPercent = useMemo(() => {
    if (!buffered || buffered.length === 0) {
      return 0
    }

    return +((buffered.end(buffered.length - 1) * 100) / duration).toFixed(2)
  }, [duration, buffered])

  return (
    <div
      className="h-1 relative group cursor-pointer"
      ref={progressRef}
      onClick={handleSeek}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          width: `${playerPercent}%`
        }}
        className="bg-primary h-full transition-all absolute z-[2]"
      />

      <div
        style={{ width: `${bufferedPercent}%` }}
        className="bg-gray-300 h-full transition-all absolute"
      />
      <span
        className="absolute inline-block bg-secondary opacity-0 text-white transition-opacity -mt-8 px-2 rounded-md group-hover:z-[3] group-hover:pointer-events-none group-hover:opacity-100 -translate-x-1/2"
        style={{ left: `${mouseLeft}%` }}
      >
        {videoDurationToString(mouseTime)}
      </span>
    </div>
  )
}

export default ProgressBar

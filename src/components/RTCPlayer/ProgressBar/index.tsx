import {
  MouseEvent,
  ReactElement,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { secondsToString } from 'utils/timeToString'

interface Props {
  duration: number
  currentTime: number
  audioRef: RefObject<HTMLAudioElement>
}

const ProgressBar = (props: Props): ReactElement => {
  const { audioRef, currentTime, duration } = props
  const [mouseLeft, setMouseLeft] = useState<number>(0)
  const [mouseTime, setMouseTime] = useState<number>(0)
  const progressRef = useRef<HTMLDivElement>(null)

  const handleSeek = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !audioRef.current) return

      const progressTime =
        (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * duration

      audioRef.current.currentTime = progressTime
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

  return (
    <div
      className="h-1 w-96 bg-white relative group cursor-pointer"
      ref={progressRef}
      onClick={handleSeek}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{ width: `${playerPercent}%` }}
        className="bg-primary h-full transition-all absolute z-[2]"
      />
      <span
        style={{ left: `${mouseLeft}%` }}
        className="absolute inline-block bg-secondary opacity-0 text-white transition-opacity -mt-8 px-2 rounded-md group-hover:z-[3] group-hover:pointer-events-none group-hover:opacity-100 -translate-x-1/2"
      >
        {secondsToString(mouseTime)}
      </span>
    </div>
  )
}

export default ProgressBar

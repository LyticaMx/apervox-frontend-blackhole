import {
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { formatSeconds } from 'utils/formatTime'

interface Props {
  duration: number
  currentTime: number
  onClick: (time: number) => void
}

const ProgressBar = (props: Props): ReactElement => {
  const { duration, currentTime, onClick } = props
  const [mouseLeft, setMouseLeft] = useState<number>(0)
  const [mouseTime, setMouseTime] = useState<number>(0)
  const progressRef = useRef<HTMLDivElement>(null)

  const handleSeek = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current) return

      onClick(e.nativeEvent.offsetX / progressRef.current.offsetWidth)
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
      className="h-1 relative group cursor-pointer bg-white"
      ref={progressRef}
      onClick={handleSeek}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          width: `${playerPercent}%`
        }}
        className="bg-primary h-full absolute z-[2]"
      />

      <span
        className="absolute inline-block bg-secondary opacity-0 text-white transition-opacity mt-4 px-2 rounded-md group-hover:z-[3] group-hover:pointer-events-none group-hover:opacity-100 -translate-x-1/2"
        style={{ left: `${mouseLeft}%` }}
      >
        {formatSeconds(mouseTime)}
      </span>
    </div>
  )
}

export default ProgressBar

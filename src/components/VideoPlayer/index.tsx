import {
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
  BackwardIcon,
  ForwardIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Grid from 'components/Grid'
import ImageFilters, {
  ImageFiltersState
} from 'components/ImageEditor/ImageFilters'
import useProgress from 'hooks/useProgress'
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import ProgressBar from './ProgressBar'
import {
  Player,
  BigPlayButton,
  PlayerState,
  PlayerReference,
  ControlBar,
  PlaybackRateMenuButton,
  PlayToggle
} from 'video-react'
import 'video-react/dist/video-react.css'
import './styles.css'

interface Props {
  videoUrl: string
}

interface PlayerReferenceWithVideo extends PlayerReference {
  video: {
    // this is for the video component object see: (https://video-react.js.org/components/player/)
    video: HTMLVideoElement // Get the original HTML element
  }
}

const VideoPlayer = (props: Props): ReactElement => {
  const { videoUrl } = props
  const playerRef = useRef<PlayerReferenceWithVideo>(null)
  const volumeRef = useRef<HTMLInputElement>(null)
  const zoomRef = useRef<HTMLInputElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [playerState, setPlayerState] = useState<PlayerState>()
  const [zoom, setZoom] = useState<number>(1)
  const rates = useMemo<number[]>(() => [2, 1.5, 1, 0.75, 0.5], [])

  useEffect(() => {
    if (!playerRef.current) return
    playerRef.current.subscribeToStateChange((current) =>
      setPlayerState(current)
    )
  }, [])

  const togglePlay = useCallback((): void => {
    if (!playerState) return
    if (playerState?.paused) playerRef.current?.play()
    else playerRef.current?.pause()
  }, [playerState?.paused])

  const changeCurrentTime = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      if (!playerRef.current || !playerState) return
      const name = event.currentTarget.name
      switch (name) {
        case 'backward':
          playerRef.current.seek(playerState.currentTime - 5)
          break
        case 'forward':
          playerRef.current.seek(playerState.currentTime + 5)
          break
        default:
          break
      }
    },
    [playerState?.currentTime]
  )

  const changeRate = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      if (!playerRef.current) return
      playerRef.current.playbackRate = +event.currentTarget.name
    },
    []
  )

  const changeVolume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!playerRef.current) return
      playerRef.current.volume = +(+event.target.value / 100).toFixed(2)
    },
    [playerState?.volume]
  )

  const toggleMuted = useCallback(() => {
    if (!playerRef.current || !playerState) return
    if (playerState.volume === 0) playerRef.current.volume = 1
    else playerRef.current.volume = 0
  }, [playerState?.volume])

  const playerVolume = useMemo(
    () => (playerState ? playerState.volume * 100 : 100),
    [playerState?.volume]
  )

  const applyFilters = (newFilters: ImageFiltersState): void => {
    if (!videoContainerRef.current || !playerRef.current) return
    const filters: string[] = []

    for (const key in newFilters) {
      switch (key) {
        case 'hue': {
          const hue = newFilters[key]
          if (hue >= 210 && hue <= 214) filters.push('hue-rotate(0deg)')
          else filters.push(`hue-rotate(${-1 * newFilters[key]}deg)`)
          break
        }
        default:
          filters.push(`${key}(${newFilters[key]}%)`)
          break
      }
    }

    if (!playerRef.current.video?.video) return
    playerRef.current.video.video.style.filter = filters.join(' ').toLowerCase()
  }

  const applyTransformations = (zoom: number): void => {
    if (!videoContainerRef.current) return
    videoContainerRef.current.style.transform = `scale(${zoom})`
  }

  const changeZoom = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget
    switch (name) {
      case 'zoomIn':
        setZoom((zoom) => (zoom < 3 ? zoom + 0.5 : zoom))
        break
      case 'zoomOut':
        setZoom((zoom) => (zoom > 0.5 ? zoom - 0.5 : zoom))
        break
      default:
        break
    }
  }, [])

  const playbackExtraProps: any = { order: 7.1 }

  useProgress(volumeRef, [playerVolume])

  useProgress(zoomRef, [zoom])

  useEffect(() => {
    if (!playerRef.current) return
    playerRef.current.load()
  }, [videoUrl])

  useEffect(() => {
    applyTransformations(zoom)
  }, [zoom])

  return (
    <div>
      <div className="overflow-auto">
        <div ref={videoContainerRef}>
          <Player ref={playerRef}>
            <BigPlayButton className="!hidden" />
            <ControlBar disableCompletely={!playerState?.isFullscreen}>
              <PlayToggle />
              <PlaybackRateMenuButton {...playbackExtraProps} rates={rates} />
            </ControlBar>
            <source src={videoUrl} />
            <button
              className={clsx(
                'p-4 bg-black bg-opacity-40 rounded-full absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2',
                playerState?.hasStarted && 'hidden'
              )}
              onClick={togglePlay}
            >
              <PlayIcon className="w-10 h-10 text-white" />
            </button>
            <button
              className={clsx(
                'bg-white h-8 w-8 text-secondary-gray flex items-center justify-center absolute z-[2] top-1 right-1 transition-opacity duration-700 overflow-hidden rounded-md',
                !playerState?.hasStarted ||
                  playerState?.userActivity ||
                  playerState?.paused
                  ? 'opacity-1 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              )}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
          </Player>
        </div>
      </div>
      <ProgressBar
        currentTime={playerState?.currentTime ?? 1}
        duration={playerState?.duration ?? 100} // Número inicial cuando la duración no existe
        buffered={playerState?.buffered}
        playerRef={playerRef}
      />
      <div className="bg-secondary text-white px-6 py-4 rounded-b-md">
        <Grid>
          <Grid item xs={12} md={4} className="flex gap-2 items-center">
            {rates
              .map((rate) => (
                <button
                  key={rate}
                  name={`${rate}`}
                  onClick={changeRate}
                  className={clsx(
                    'border border-white rounded-lg w-10 transition-colors text-sm',
                    playerState?.playbackRate === rate
                      ? 'text-primary bg-white'
                      : ''
                  )}
                >{`${rate}x`}</button>
              ))
              .reverse()}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="flex items-center justify-center gap-4"
          >
            <button
              className="transition-colors hover:enabled:text-primary"
              name="backward"
              onClick={changeCurrentTime}
            >
              <BackwardIcon className="w-8 h-8" />
            </button>
            <button
              onClick={togglePlay}
              className="transition-colors hover:enabled:text-primary"
            >
              {playerState?.paused ? (
                <PlayCircleIcon className="w-10 h-10" />
              ) : (
                <PauseCircleIcon className="w-10 h-10" />
              )}
            </button>
            <button
              className="transition-colors hover:enabled:text-primary"
              name="forward"
              onClick={changeCurrentTime}
            >
              <ForwardIcon className="w-8 h-8" />
            </button>
          </Grid>
          <Grid item xs={12} md={4} className="flex justify-end items-center">
            <div className="flex items-center gap-2 mr-10">
              <button onClick={toggleMuted}>
                {playerState?.volume === 0 ? (
                  <SpeakerXMarkIcon className="w-5 h-5" />
                ) : (
                  <SpeakerWaveIcon className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                value={playerVolume}
                max={100}
                step={1}
                onChange={changeVolume}
                className="video-slider slider-progress w-36 bg-transparent cursor-pointer"
                ref={volumeRef}
              />
            </div>
            <button
              onClick={() => playerRef.current?.toggleFullscreen()}
              className="hover:enabled:bg-white group rounded-md p-1 transition-colors"
            >
              <ArrowsPointingOutIcon className="w-5 h-5 text-white group-hover:group-enabled:text-primary" />
            </button>
          </Grid>
        </Grid>
        <div className="mt-4 flex items-center gap-2">
          <button
            className="group hover:enabled:bg-white rounded-md p-1 transition-colors"
            name="zoomOut"
            onClick={changeZoom}
          >
            <MagnifyingGlassMinusIcon className="h-5 w-5 text-white group-hover:group-enabled:text-primary" />
          </button>
          <input
            type="range"
            ref={zoomRef}
            min={0.5}
            max={3}
            step={0.5}
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
            className="video-slider slider-progress w-36 bg-transparent cursor-pointer"
          />
          <button
            className="group hover:enabled:bg-white rounded-md p-1 transition-colors"
            name="zoomIn"
            onClick={changeZoom}
          >
            <MagnifyingGlassPlusIcon className="h-5 w-5 text-white group-hover:group-enabled:text-primary" />
          </button>
        </div>
        <div className="mt-4">
          <ImageFilters applyCallback={applyFilters} />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer

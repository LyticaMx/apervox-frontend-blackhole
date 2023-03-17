import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js/src/wavesurfer'
import { generteFilters } from '../utils/equalizer'

const useWavesurferControls = (wavesurfer): any => {
  const $ws = useRef<WaveSurfer>(wavesurfer)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const [audioProcess, setAudioProcess] = useState(0)
  const [zoom, setZoomState] = useState(0)
  const [volume, setVolumeState] = useState(50)
  const [speed, setSpeedState] = useState(1)
  const [filters, setFiltersState] = useState([])

  useEffect(() => {
    if (wavesurfer) {
      $ws.current = wavesurfer

      $ws.current.on('ready', () => {
        setVolume(50)
        setDuration($ws.current.getDuration())

        const fq = generteFilters($ws.current)
        setFilters(fq)
      })
      $ws.current.on('audioprocess', function (process) {
        setAudioProcess(process)
      })
    }
  }, [wavesurfer])

  const play = (start?: number, end?: number): void => {
    setIsPlaying(true)

    $ws.current?.play(start, end)
  }
  const stop = (): void => {
    setIsPlaying(false)
    $ws.current?.stop()
  }
  const playPause = (): void => {
    setIsPlaying((prev) => !prev)
    $ws.current?.playPause()
  }
  const setZoom = (value: number): void => {
    setZoomState(value)
    $ws.current?.zoom(value * 10)
  }
  const setVolume = (value: number): void => {
    setVolumeState(value)
    $ws.current?.setVolume(value / 100)
  }
  const setSpeed = (value: number): void => {
    $ws.current?.setPlaybackRate(value)
    setSpeedState(value)
  }

  const skipBackward = (seconds: number = 5): void => {
    $ws.current?.skipBackward(seconds)
    if (!isPlaying) {
      play()
    }
  }

  const skipForward = (seconds: number = 5): void => {
    $ws.current?.skipForward(seconds)
    if (!isPlaying) {
      play()
    }
  }

  const setFilters = (fq: any): void => {
    setFiltersState(fq)
    $ws.current.backend.setFilters(fq)
  }

  return {
    isPlaying,
    zoom,
    duration,
    volume,
    audioProcess,
    speed,
    filters,
    play,
    stop,
    playPause,
    setZoom,
    setVolume,
    setSpeed,
    skipBackward,
    skipForward,
    setFilters
  }
}

export default useWavesurferControls

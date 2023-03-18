/* eslint-disable no-console */
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode
} from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min'

import LinearProgress from 'components/Progress/Linear'

import PlayButtons from './components/PlayButtons'

import { SpeedControl } from './components/SpeedControl'
import VolumenControl from './components/VolumenControl'
import Equalizer from './components/Equalizer'
import ReactDOM from 'react-dom'
import ZoomController from './components/ZoomControler'
import RangeControl from './components/RangeControl'

interface Audio {
  id: string
  name: string
  url: string
  duration: number
}

export interface Region {
  id: string
  start: number
  partialStart: number
  end: number
  partialEnd: number
  color: string
  speaker_id?: number
  transcription?: string
}

interface WavesurferRegion extends Region {
  remove: () => void
}

interface Props {
  audio: Audio

  /* Behaviors */
  wave?: boolean
  zoom?: boolean
  volume?: boolean
  equalizer?: boolean
  timeline?: boolean
  minimap?: boolean
  interactive?: boolean
  confirmToAddRegion?: boolean

  /* Data */
  regions?: Region[]

  /* Options */
  secondsToJump?: number
  defaultRegionColor?: string

  /* Events */
  onUpdate?: (region: any) => void
  onCreate?: (region: any) => void
  onClick?: (region: any) => void
  onReady?: () => void
  onAudioProcess?: (processed: number) => void

  /* Children */
  children?: ReactNode
}

const WaveSurferPlayer = ({
  audio,

  /* Behaviors */
  wave = false,
  zoom = false,
  volume = false,
  equalizer = false,
  timeline = false,
  minimap = false,
  interactive = false,

  /* Data */
  regions,

  /* Options */
  secondsToJump = 5,
  defaultRegionColor,

  /* Events */
  onUpdate,
  onCreate,
  onClick,
  onReady,
  onAudioProcess,
  children
}: Props): ReactElement => {
  const wavesurfer = useRef<any>(null)
  const waveContainer = useRef<any>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [audioProcess, setAudioProcess] = useState(0)
  const [zoomPercentage, setZoomPercentage] = useState(0)
  const [volumeLevel, setVolumeLevel] = useState(50)
  const [equalizerFilters, setEqualizerFilters] = useState([])
  const [speed, setSpeed] = useState(1)

  const isReady = useMemo(() => loadProgress === 100, [loadProgress])

  useEffect(() => {
    const plugins: any[] = []

    if (minimap) {
      plugins.push(
        MinimapPlugin.create({
          container: `#wave-minimap-${audio.id}`,
          waveColor: '#777',
          progressColor: '#222',
          height: 20
        })
      )
    }

    if (regions) {
      plugins.push(
        RegionsPlugin.create({
          regionsMinLength: 0.1,
          regions: regions.map((region) => ({
            ...region,
            color: defaultRegionColor,
            drag: interactive,
            resize: interactive
          })),
          dragSelection: interactive
            ? {
                slop: 0.01
              }
            : false
        })
      )
    }

    if (timeline) {
      plugins.push(
        TimelinePlugin.create({
          container: `#wave-timeline-${audio.id}`
        })
      )
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveContainer.current,
      responsive: true,
      waveColor: '#9fa1a6', // '#567FFF',
      barGap: 2,
      barWidth: 1,
      barRadius: 2,
      cursorWidth: 3,
      cursorColor: '#6366f1', // '#567FFF'
      plugins
    })

    wavesurfer.current.load(audio.url)

    wavesurfer.current.on('loading', (progress) => {
      setLoadProgress(progress)
    })

    wavesurfer.current.on('audioprocess', function (process) {
      setAudioProcess(process)
      if (onAudioProcess) onAudioProcess(process)
    })

    wavesurfer.current.on('finish', function () {
      setIsPlaying(false)
    })

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(0.5)
      wavesurfer.current.setVolume(50 / 100)
      setDuration(wavesurfer.current.getDuration())

      const EQ = [
        {
          f: 32,
          type: 'lowshelf'
        },
        {
          f: 64,
          type: 'peaking'
        },
        {
          f: 125,
          type: 'peaking'
        },
        {
          f: 250,
          type: 'peaking'
        },
        {
          f: 500,
          type: 'peaking'
        },
        {
          f: 1000,
          type: 'peaking'
        },
        {
          f: 2000,
          type: 'peaking'
        },
        {
          f: 4000,
          type: 'peaking'
        },
        {
          f: 8000,
          type: 'peaking'
        },
        {
          f: 16000,
          type: 'highshelf'
        }
      ]

      buildEqualizer(EQ)
      if (onReady) {
        onReady()
      }
    })

    wavesurfer.current.on('region-click', (region) => {
      if (onClick) {
        onClick(region)
      }
    })

    wavesurfer.current.on('region-update-end', (region) => {
      const regionExists = regions?.find(
        (prevRegion) => prevRegion.id === region.id
      )

      if (regionExists ?? region.color === defaultRegionColor) {
        if (onUpdate) {
          onUpdate(region)
        }
      } else {
        /* Cuando se cree un segmento nuevo se requiere confirmarlo desde la funcion "onCreate"
        Al momento de la creación la region se elimina, se debe ocupar la funcion "handleCreate"
        desde el componente padre para reasignar la region. */
        if (onCreate) {
          onCreate(region)
        }
        region.remove()
      }
    })
  }, [])

  const buildEqualizer = (fq): void => {
    /* Create filters for equalizer */
    const filters = fq.map(function (band) {
      const filter = wavesurfer.current.backend.ac.createBiquadFilter()
      filter.type = band.type
      filter.gain.value = 0
      filter.Q.value = 1
      filter.frequency.value = band.f
      return filter
    })

    setEqualizerFilters(filters)

    /* Connect filters to wavesurfer */
    wavesurfer.current.backend.setFilters(filters)
  }

  const handlePlayPause = (): void => {
    wavesurfer.current.playPause()
    setIsPlaying((prev) => !prev)
  }

  const handleBackward = (): void => {
    if (isReady) {
      wavesurfer.current.skipBackward(secondsToJump)
      if (!wavesurfer.current.isPlaying()) {
        wavesurfer.current.playPause()
        setIsPlaying(true)
      }
    }
    // else {
    //   audioElement.current.currentTime -= 10
    //   if (audioElement.current.paused) {
    //     audioElement.current.play()
    //     setIsPlaying(true)
    //   }
    // }
  }

  const handleForward = (): void => {
    wavesurfer.current.skipForward(secondsToJump)
    if (isReady) {
      if (!wavesurfer.current.isPlaying()) {
        wavesurfer.current.playPause()
        setIsPlaying(true)
      }
    }
    // else {
    //   audioElement.current.currentTime += 10
    //   if (audioElement.current.paused) {
    //     audioElement.current.play()
    //     setIsPlaying(true)
    //   }
    // }
  }

  const handleZoom = (newZoom): void => {
    setZoomPercentage(newZoom)
    wavesurfer.current.zoom(newZoom * 10)
  }

  const handleVolume = (newVolume): void => {
    setVolumeLevel(newVolume)
    wavesurfer.current.setVolume(newVolume / 100)
  }

  const handleFilters = (newFilters): void => {
    wavesurfer.current.backend.setFilters(newFilters)
  }

  const handleCreateRegion = (region: WavesurferRegion): void => {
    wavesurfer.current.addRegion(region)
  }

  const handleUpdateRegion = (region: WavesurferRegion): void => {
    const foundRegion = wavesurfer.current.regions.list[region.id]

    foundRegion.remove()
    wavesurfer.current.addRegion(region)
  }

  const handleDeleteRegion = (region: WavesurferRegion): void => {
    region.remove()
  }

  const handlePlay = (start?: number, end?: number): void => {
    setIsPlaying(true)

    console.log(start, end)
    wavesurfer.current.play(start, end)
  }

  const handleStop = (): void => {
    setIsPlaying(false)

    wavesurfer.current.stop()
  }

  const handleSpeed = (value: number): void => {
    wavesurfer.current.setPlaybackRate(value)
    setSpeed(value)
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        handleCreateRegion,
        handleUpdateRegion,
        handleDeleteRegion,
        handlePlay,
        handleStop,
        isPlaying
      } as any)
    }
    return child
  })

  const portals = useMemo(() => {
    if (!isReady) return null
    if (!regions?.length) return null

    return regions.map((item) => {
      const $region = waveContainer.current.querySelector(
        `[data-id="${item.id}"]`
      )

      if (!$region) return null

      return ReactDOM.createPortal(<div>efra</div>, $region)
    })
  }, [regions, isReady])

  return (
    <div className="relative">
      {!isReady && (wave || minimap || timeline) && (
        <div className="w-full absolute px-10 pt-10">
          <p className="text-center">{`${loadProgress}%`}</p>
          <LinearProgress value={loadProgress} />
        </div>
      )}

      <div className="flex gap-2 mb-1">
        <div className="border border-primary-300 flex-1 rounded-lg p-2">
          <div id={`wave-minimap-${audio.id}`} />
        </div>
        <ZoomController
          value={zoomPercentage}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
          onChange={(e) => {
            handleZoom(e.target.value)
          }}
        />
      </div>
      <div id={`wave-timeline-${audio.id}`} />
      <div
        ref={waveContainer}
        style={{
          display: wave ? 'block' : 'none'
        }}
      />
      <div className="bg-secondary p-4 flex gap-10">
        <div className="flex-1">
          <RangeControl
            start={0}
            end={duration}
            onChange={(value) => {
              handlePlay(...value)
            }}
          />
        </div>
        <div className="w-3/6">
          <PlayButtons
            isReady={isReady}
            isPlaying={isPlaying}
            process={audioProcess}
            duration={duration}
            onPlayPause={handlePlayPause}
            onBackward={handleBackward}
            onForward={handleForward}
          />
        </div>
        <div className="flex-1 space-y-4">
          <SpeedControl value={speed} onClick={handleSpeed} />
          <VolumenControl
            value={volumeLevel}
            onChange={(e) => {
              handleVolume(e.target.value)
            }}
          />
        </div>
      </div>

      {/* ECUALIZADOR */}
      <div className="bg-secondary flex justify-center">
        <div className="w-3/6">
          <Equalizer filters={equalizerFilters} onChange={handleFilters} />
        </div>
      </div>

      {portals}

      <div className="w-full h-max">{childrenWithProps as ReactNode}</div>
    </div>
  )
}

export default WaveSurferPlayer

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

import { formatSeconds } from 'utils/formatTime'

import PlayButtons from './components/PlayButtons'
import OptionButtons from './components/OptionButtons'

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
  children
}: Props): ReactElement => {
  const wavesurfer = useRef<any>(null)
  const waveContainer = useRef<any>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [audioProcess, setAudioProcess] = useState(0)
  const [zoomPercentage, setZoomPercentage] = useState(0)
  const [volumeLevel, setVolumeLevel] = useState(50)
  const [equalizerFilters, setEqualizerFilters] = useState([])

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
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 3,
      cursorColor: '#9fa1a6', // '#567FFF'
      plugins
    })

    wavesurfer.current.load(audio.url)

    wavesurfer.current.on('loading', (progress) => {
      setLoadProgress(progress)
    })

    wavesurfer.current.on('audioprocess', function (process) {
      setAudioProcess(process)
    })

    wavesurfer.current.on('finish', function () {
      setIsPlaying(false)
    })

    wavesurfer.current.on('ready', function () {
      wavesurfer.current.setVolume(0.5)
      wavesurfer.current.setVolume(50 / 100)

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

    const parseStart = start ? parseFloat(String(start)) : null
    const parseEnd = end ? parseFloat(String(end)) : null

    wavesurfer.current.play(parseStart, parseEnd)
  }

  const handleStop = (): void => {
    setIsPlaying(false)

    wavesurfer.current.stop()
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

  return (
    <div className="relative">
      {!isReady && (wave || minimap || timeline) && (
        <div className="w-full absolute px-10 pt-10">
          <p className="text-center">{`${loadProgress}%`}</p>
          <LinearProgress value={loadProgress} />
        </div>
      )}
      <div id={`wave-timeline-${audio.id}`} />
      <div
        ref={waveContainer}
        style={{
          display: wave ? 'block' : 'none'
        }}
      />
      <div id={`wave-minimap-${audio.id}`} />
      <div className="w-full p-2 grid grid-cols-3">
        <div></div>
        <div>
          <PlayButtons
            isReady={isReady}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onBackward={handleBackward}
            onForward={handleForward}
          />
        </div>
        <div>
          <OptionButtons
            zoom={zoom ? zoomPercentage : undefined}
            onChangeZoom={handleZoom}
            volume={volume ? volumeLevel : undefined}
            onChangeVolume={handleVolume}
            equalizerFilters={equalizer ? equalizerFilters : undefined}
            onChangeFilters={handleFilters}
          />
        </div>
        <div className="col-span-3 py-3 px-20 lg:px-36 flex items-center">
          {formatSeconds(parseInt(String(audioProcess)))}
          <div className="px-10 w-full">
            <LinearProgress value={audioProcess} max={audio.duration} />
          </div>
          {formatSeconds(audio.duration)}
        </div>
      </div>
      <div className="w-full h-max">{childrenWithProps as ReactNode}</div>
    </div>
  )
}

export default WaveSurferPlayer

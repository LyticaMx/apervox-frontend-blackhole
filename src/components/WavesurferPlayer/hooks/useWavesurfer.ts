/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useCallback, useEffect, useState } from 'react'
import { map } from 'lodash'
import Wavesurfer from 'wavesurfer.js'
import { useIntl } from 'react-intl'
import { useWavesurferConfig } from './useWavesurferConfig'
import { useRegionEvents } from './useRegionEvents'
import { messages } from '../messages'

export const useWavesurfer = ({
  onChangeRegions,
  onAudioClick,
  audioUrl,
  wavesurferRef,
  audioWave,
  regions
}) => {
  const [equalizerFilters, setEqualizerFilters] = useState([])
  const { formatMessage } = useIntl()
  const [zoom, setZoom] = useState(0)
  const [speed, setSpeed] = useState(40)
  const [loadTimeline, setLoadTimeline] = useState(false)
  const [wavesurfer, setWavesurfer] = useState<any>(null)
  const [continuousPlay, setContinuousPlay] = useState(false)
  const [volume, setVolume] = useState(100)
  const [skip, setSkip] = useState(50)
  const { EQ, plugins, splitChannelsOptions } = useWavesurferConfig()
  const {
    annotationRef,
    regionHandler,
    regionSelected,
    showRegionMenu,
    toggleShowRegionMenu,
    regionMenuCoords,
    handleLoadRegions,
    playRegionLoop
  } = useRegionEvents({
    wavesurfer,
    onChangeRegions
  })

  const speedMarks = [
    { value: 0, label: '0.5' },
    { value: 20, label: '0.75' },
    { value: 40, label: formatMessage(messages.normalSpeed) },
    { value: 60, label: '1.25' },
    { value: 80, label: '1.5' },
    { value: 100, label: '2' }
  ]

  const timeSkipMarks = [
    { value: 0, label: '1seg' },
    { value: 50, label: '3seg' },
    { value: 100, label: '5seg' }
  ]

  const timeSkipValues = {
    0: 1,
    50: 3,
    100: 5
  }

  const getSpeed = useCallback(() => {
    const mark: any = speedMarks.find((item) => item.value === speed)

    return mark.label === 'Normal' ? 1 : parseFloat(mark.label)
  }, [speed])

  const getSkip = useCallback(() => {
    const mark: any = timeSkipMarks.find((item) => item.value === skip)

    return timeSkipValues[mark.value]
  }, [skip])

  const generateEqualizer = () => {
    const filters = map(EQ, (band) => {
      const filter = wavesurfer.backend.ac.createBiquadFilter()

      filter.type = band.type
      filter.gain.value = 0
      filter.Q.value = 1
      filter.frequency.value = band.f

      return filter
    })

    wavesurfer.backend.setFilters(filters)
    setEqualizerFilters(wavesurfer.getFilters())
  }

  const loadWavesurfer = () => {
    const wavesurfer = Wavesurfer.create({
      backend: 'MediaElementWebAudio',
      container: '#waveform',
      loopSelection: true,
      plugins,
      // normalize: true,
      responsive: true,
      backgroundColor: '#FFFFFF',
      progressColor: '#FFFFFF',
      scrollParent: true,
      splitChannels: true,
      splitChannelsOptions,
      waveColor: '#A8DBA8'
    })

    // eslint-disable-next-line no-console
    wavesurfer.on('waveform-ready', () => {
      setLoadTimeline(true)
    })

    wavesurfer.on('error', (msg) => console.error(msg))

    setWavesurfer(wavesurfer)
  }

  const handleEqualizerChange = (index, value): void => {
    const filters: any = [...equalizerFilters]

    if (filters[index]) {
      filters[index].gain.value = value
    }

    setEqualizerFilters(filters)
  }

  const getCursorTime = () => {}

  const handleZoomIn = () => setZoom(zoom < 300 ? zoom + 50 : 300)

  const handleZoomOut = () => setZoom(zoom > 0 ? zoom - 50 : 0)

  const handleZoomChange = (e) => setZoom(e.target.value)

  const handleVolumeChange = (event, value) => setVolume(value)

  const handleSkipChange = (event, value) => setSkip(value)

  const handlePlay = useCallback(() => {
    if (!wavesurfer) return
    console.log(
      '🚀 ~ file: useWavesurfer.ts:141 ~ handlePlay ~ wavesurfer',
      wavesurfer
    )
    wavesurfer.playPause()
  }, [wavesurfer])

  const handlePause = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.pause()
  }, [wavesurfer])

  const handleStop = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.stop()
  }, [wavesurfer])

  const handleRewind = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.skipBackward(getSkip())
  }, [wavesurfer, getSkip])

  const handleFastForward = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.skipForward(getSkip())
  }, [wavesurfer, getSkip])

  const toggleContinuousPlay = () => setContinuousPlay(!continuousPlay)

  const handleSpeed = (event, value) => {
    setSpeed(value)
  }

  const addCursorEvents = useCallback(() => {
    wavesurfer.on('play', () => {
      if (onAudioClick) {
        onAudioClick({
          timeStamp: getCursorTime(),
          isPlaying: wavesurfer.isPlaying()
        })
      }
    })
    wavesurfer.on('pause', () => {
      if (onAudioClick) {
        onAudioClick({
          timeStamp: getCursorTime(),
          isPlaying: wavesurfer.isPlaying()
        })
      }
    })
  }, [onAudioClick, wavesurfer])

  useEffect(() => {
    loadWavesurfer()
  }, [])

  useEffect(() => {
    if (!wavesurfer) return
    if (!loadTimeline) return
    const timeoutId = setTimeout(() => {
      wavesurfer.initPlugin('timeline')
    }, 500)

    return () => {
      if (!wavesurfer) return
      if (!loadTimeline) return

      clearTimeout(timeoutId)
    }
  }, [wavesurfer, loadTimeline])

  useEffect(() => {
    if (!wavesurfer) return
    if (!audioUrl) return
    if (!audioWave) return
    generateEqualizer()
    wavesurfer.zoom(zoom)
    wavesurfer.setPlaybackRate(getSpeed())
    wavesurfer.setVolume(1)
    addCursorEvents()

    wavesurfer.load(audioUrl, audioWave?.data)

    return () => {
      if (wavesurfer) wavesurfer.stop()
    }
  }, [wavesurfer, audioUrl, audioWave])

  useEffect(() => {
    if (wavesurferRef) {
      wavesurferRef({
        handlePlay,
        handleFastForward,
        handleRewind,
        wavesurfer
      })
    }
  }, [handlePlay, handleFastForward, handleRewind, wavesurferRef, wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return
    wavesurfer.zoom(zoom)
  }, [wavesurfer, zoom])

  useEffect(() => {
    if (!wavesurfer) return
    wavesurfer.setVolume(volume / 100)
  }, [wavesurfer, volume])

  useEffect(() => {
    if (!wavesurfer) return
    wavesurfer.setPlaybackRate(getSpeed())
  }, [wavesurfer, speed])

  useEffect(() => {
    if (!wavesurfer) return
    if (!continuousPlay) wavesurfer.un('finish')
    else wavesurfer.on('finish', () => wavesurfer.play())
  }, [wavesurfer, continuousPlay])

  useEffect(() => {
    handleLoadRegions(regions)
  }, [regions])

  return {
    equalizerFilters,
    handleEqualizerChange,
    wavesurfer,
    handleZoomIn,
    handleZoomOut,
    handleZoomChange,
    handleVolumeChange,
    handleRewind,
    handleFastForward,
    handlePlay,
    handlePause,
    handleStop,
    handleSpeed,
    toggleContinuousPlay,
    toggleShowRegionMenu,
    playRegionLoop,
    zoom,
    volume,
    speed,
    continuousPlay,
    speedMarks,
    showRegionMenu,
    annotationRef,
    regionSelected,
    regionMenuCoords,
    regionHandler,
    timeSkipMarks,
    getSkip,
    skip,
    handleSkipChange
  }
}

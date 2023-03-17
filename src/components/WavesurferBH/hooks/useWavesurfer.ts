/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useCallback, useEffect, useRef, useState } from 'react'
import Wavesurfer from 'wavesurfer.js'
// import { useWavesurferConfig } from './useWavesurferConfig'
// import { useRegionEvents } from './useRegionEvents'

// export const useWavesurfer = ({
//   onChangeRegions,
//   onAudioClick,
//   audioUrl,
//   wavesurferRef,
//   audioWave,
//   regions
// }) => {
//   const wavesurfer = useRef<any>(null)
//   const [zoom, setZoom] = useState(0)
//   const [speed, setSpeed] = useState(40)
//   const [loadTimeline, setLoadTimeline] = useState(false)
//   const [continuousPlay, setContinuousPlay] = useState(false)
//   const [volume, setVolume] = useState(100)
//   const [skip, setSkip] = useState(50)

//   // const { EQ, plugins, splitChannelsOptions } = useWavesurferConfig()
//   //   const {
//   //     annotationRef,
//   //     regionHandler,
//   //     regionSelected,
//   //     showRegionMenu,
//   //     toggleShowRegionMenu,
//   //     regionMenuCoords,
//   //     handleLoadRegions,
//   //     playRegionLoop
//   //   } = useRegionEvents({
//   //     wavesurfer,
//   //     onChangeRegions
//   //   })

//   const speedMarks = [
//     { value: 40, label: '1' },
//     { value: 80, label: '1.5' },
//     { value: 100, label: '2' }
//   ]

//   const timeSkipMarks = [
//     { value: 0, label: '1seg' },
//     { value: 50, label: '3seg' },
//     { value: 100, label: '5seg' }
//   ]

//   const timeSkipValues = {
//     0: 1,
//     50: 3,
//     100: 5
//   }

//   const loadWavesurfer = () => {
//     const wavesurfer = Wavesurfer.create({
//       backend: 'MediaElementWebAudio',
//       container: '#waveform',
//       loopSelection: true,
//       // plugins,
//       // normalize: true,
//       responsive: true,
//       backgroundColor: '#FFFFFF',
//       progressColor: '#FFFFFF',
//       scrollParent: true,
//       splitChannels: true,
//       // splitChannelsOptions,
//       waveColor: '#A8DBA8'
//     })

//     // eslint-disable-next-line no-console
//     wavesurfer.on('waveform-ready', () => {
//       setLoadTimeline(true)
//     })

//     wavesurfer.on('error', (msg) => console.error(msg))

//     setWavesurfer(wavesurfer)
//   }
//   const handlePlay = useCallback(() => {
//     if (!wavesurfer) return

//     wavesurfer.playPause()
//   }, [wavesurfer])

//   const handlePause = useCallback(() => {
//     if (!wavesurfer) return
//     wavesurfer.pause()
//   }, [wavesurfer])

//   const handleStop = useCallback(() => {
//     if (!wavesurfer) return
//     wavesurfer.stop()
//   }, [wavesurfer])

//   const handleRewind = useCallback(() => {
//     if (!wavesurfer) return
//     wavesurfer.skipBackward(getSkip())
//   }, [wavesurfer, getSkip])

//   const handleFastForward = useCallback(() => {
//     if (!wavesurfer) return
//     wavesurfer.skipForward(getSkip())
//   }, [wavesurfer, getSkip])

//   const toggleContinuousPlay = () => setContinuousPlay(!continuousPlay)

//   const handleSpeed = (event, value) => {
//     setSpeed(value)
//   }

//   const addCursorEvents = useCallback(() => {
//     wavesurfer.on('play', () => {
//       if (onAudioClick) {
//         onAudioClick({
//           timeStamp: getCursorTime(),
//           isPlaying: wavesurfer.isPlaying()
//         })
//       }
//     })
//     wavesurfer.on('pause', () => {
//       if (onAudioClick) {
//         onAudioClick({
//           timeStamp: getCursorTime(),
//           isPlaying: wavesurfer.isPlaying()
//         })
//       }
//     })
//   }, [onAudioClick, wavesurfer])

//   useEffect(() => {
//     loadWavesurfer()
//   }, [])

//   useEffect(() => {
//     if (!wavesurfer) return
//     if (!loadTimeline) return
//     const timeoutId = setTimeout(() => {
//       wavesurfer.initPlugin('timeline')
//     }, 500)

//     return () => {
//       if (!wavesurfer) return
//       if (!loadTimeline) return

//       clearTimeout(timeoutId)
//     }
//   }, [wavesurfer, loadTimeline])

//   useEffect(() => {
//     if (!wavesurfer) return
//     if (!audioUrl) return
//     if (!audioWave) return
//     generateEqualizer()
//     wavesurfer.zoom(zoom)
//     wavesurfer.setPlaybackRate(getSpeed())
//     wavesurfer.setVolume(1)
//     addCursorEvents()

//     wavesurfer.load(audioUrl, audioWave?.data)

//     return () => {
//       if (wavesurfer) wavesurfer.stop()
//     }
//   }, [wavesurfer, audioUrl, audioWave])

//   useEffect(() => {
//     if (wavesurferRef) {
//       wavesurferRef({
//         handlePlay,
//         handleFastForward,
//         handleRewind,
//         wavesurfer
//       })
//     }
//   }, [handlePlay, handleFastForward, handleRewind, wavesurferRef, wavesurfer])

//   useEffect(() => {
//     if (!wavesurfer) return
//     wavesurfer.zoom(zoom)
//   }, [wavesurfer, zoom])

//   useEffect(() => {
//     if (!wavesurfer) return
//     wavesurfer.setVolume(volume / 100)
//   }, [wavesurfer, volume])

//   useEffect(() => {
//     if (!wavesurfer) return
//     wavesurfer.setPlaybackRate(getSpeed())
//   }, [wavesurfer, speed])

//   useEffect(() => {
//     if (!wavesurfer) return
//     if (!continuousPlay) wavesurfer.un('finish')
//     else wavesurfer.on('finish', () => wavesurfer.play())
//   }, [wavesurfer, continuousPlay])

//   useEffect(() => {
//     handleLoadRegions(regions)
//   }, [regions])

//   return {
//     equalizerFilters,
//     handleEqualizerChange,
//     wavesurfer,
//     handleZoomIn,
//     handleZoomOut,
//     handleZoomChange,
//     handleVolumeChange,
//     handleRewind,
//     handleFastForward,
//     handlePlay,
//     handlePause,
//     handleStop,
//     handleSpeed,
//     toggleContinuousPlay,
//     toggleShowRegionMenu,
//     playRegionLoop,
//     zoom,
//     volume,
//     speed,
//     continuousPlay,
//     speedMarks,
//     showRegionMenu,
//     annotationRef,
//     regionSelected,
//     regionMenuCoords,
//     regionHandler,
//     timeSkipMarks,
//     getSkip,
//     skip,
//     handleSkipChange
//   }
// }

export const useWavesurfer = (): void => {}

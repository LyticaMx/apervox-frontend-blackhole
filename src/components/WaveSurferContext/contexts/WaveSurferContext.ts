import { createContext } from 'react'
import WaveSurfer from 'wavesurfer.js/src/wavesurfer'

interface WsControls {
  isPlaying: boolean
  zoom: number
  duration: number
  volume: number
  audioProcess: number
  speed: number
  filters: BiquadFilterNode[]
  play: (start?: number, end?: number) => void
  stop: () => void
  playPause: () => void
  setZoom: (value: number) => void
  setVolume: (value: number) => void
  setSpeed: (value: number) => void
  skipBackward: (seconds?: number) => void
  skipForward: (seconds?: number) => void
  setFilters: (fq: BiquadFilterNode[]) => void
  setIsPlaying: (isPlayin: boolean) => void
  seekTo: (value: number) => void
}

export interface WsContext {
  wavesurfer: WaveSurfer | null
  controls?: WsControls
  regions?: any
  isReady: boolean
}

const WaveSurferContext = createContext<WsContext>({
  wavesurfer: null,
  isReady: false
})

export default WaveSurferContext

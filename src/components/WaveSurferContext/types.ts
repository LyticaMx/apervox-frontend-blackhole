import WaveSurfer from 'wavesurfer.js/src/wavesurfer'
import { WaveSurferParams } from 'wavesurfer.js/types/params'

export interface WsProps {
  plugins: Plugins
  audio?: Audio
  peek?: string
  regions?: any
  wsRef?: any
  config: Omit<WaveSurferParams, 'container' | 'plugins' | 'splitChannels'>
  splitChannels: boolean
  onMount?: (wavesurferRef: null | WaveSurfer) => any
  onDownload?: (() => Promise<void>) | (() => Promise<boolean>)
  showMinimap?: boolean
  showTimeline?: boolean
  showWave?: boolean
  showZoom?: boolean
  showEqualizer?: boolean
}

export interface UseWsParams
  extends Omit<WaveSurferParams, 'container' | 'plugins'> {
  container?: string | HTMLElement | null
  plugins: PluginType[]
  audio?: Audio
  onMount?: (wavesurferRef: null | WaveSurfer) => any
}

export interface PluginType {
  plugin: object
  options: any
  creator?: string
}

export type Plugin =
  | 'Regions'
  | 'Timeline'
  | 'Microphone'
  | 'Minimap'
  | 'Playlist'
  | 'Cursor'
  | 'Spectrogram'
  | 'Markers'

export type Plugins = Plugin[]

export interface Filter {
  f: number
  type: string
}

export interface Audio {
  url: string
  peek?: any
  preload?: any
}

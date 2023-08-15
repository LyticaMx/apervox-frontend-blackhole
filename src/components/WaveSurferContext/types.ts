import WaveSurfer from 'wavesurfer.js/src/wavesurfer'
import { WaveSurferParams } from 'wavesurfer.js/types/params'
import {
  Region as RegionWS,
  RegionParams
} from 'wavesurfer.js/src/plugin/regions'
import { EventHandler } from 'wavesurfer.js/types/util'

export interface RegionInterface {
  id: string
  start: number
  partialStart?: number // revisar si estos son necesarios
  end: number
  partialEnd?: number // revisar si estos son necesarios
  name: string // Revisar como se llama esta cosa
}

export interface WsProps {
  plugins: Plugins
  audio?: Audio
  peek?: string
  regions?: RegionInterface[]
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
  CustomRegion?: React.ComponentType<WsRegionProps>
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

export interface WsRegionProps extends RegionParams {
  onClick?: EventHandler
  onOver?: EventHandler
  onLeave?: EventHandler
  onDoubleClick?: EventHandler
  onIn?: EventHandler
  onOut?: EventHandler
  onRemove?: EventHandler
  onUpdate?: EventHandler
  onUpdateEnd?: EventHandler
  id: string
}
export interface RegionContentProps {
  region: RegionWS
}

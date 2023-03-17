/* eslint-disable @typescript-eslint/no-unused-vars */
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

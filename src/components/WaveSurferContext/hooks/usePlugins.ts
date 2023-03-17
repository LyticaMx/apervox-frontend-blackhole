import { useMemo } from 'react'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers'
import MinimapPlugin from 'wavesurfer.js/src/plugin/minimap'
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline'
import { Plugins, PluginType } from '../types'

interface Props {
  plugins: Plugins
  timeline?: string | HTMLElement | null
  minimap?: string | HTMLElement | null
}
const usePlugins = (props: Props): PluginType[] => {
  const plugins = useMemo(() => {
    return [
      props.plugins.includes('Regions') && {
        plugin: RegionsPlugin,
        options: { dragSelection: true }
      },
      props.plugins.includes('Timeline') && {
        plugin: TimelinePlugin,
        options: {
          container: props.timeline,
          secondaryColor: 'gray',
          secondaryFontColor: 'gray'
        }
      },
      props.plugins.includes('Markers') && {
        plugin: MarkersPlugin,
        options: {
          markers: [{ draggable: true }]
        }
      },
      props.plugins.includes('Minimap') && {
        plugin: MinimapPlugin,
        options: {
          container: props.minimap,
          waveColor: '#777',
          progressColor: '#222',
          height: 20
        }
      }
    ].filter(Boolean)
  }, [props.plugins, props.timeline, props.minimap])

  return plugins as PluginType[]
}

export default usePlugins

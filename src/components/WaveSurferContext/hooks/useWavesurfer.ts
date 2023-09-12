import { useEffect, useRef, useState } from 'react'
import { PluginDefinition } from 'wavesurfer.js/types/plugin'
import createWavesurfer, { WaveSurfer } from '../utils/createWavesurfer'
import createPlugin from '../utils/createPlugin'
import getDifference from '../utils/getDifference'
import { UseWsParams } from '../types'

const useWavesurfer = ({
  container,
  plugins = [],
  onMount,
  audio,
  ...props
}: UseWsParams): WaveSurfer | null => {
  const usedPluginsListCache = useRef<PluginDefinition[]>([])
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

  useEffect(() => {
    if (!container) return

    let _plugins: PluginDefinition[] = []

    if (plugins) {
      _plugins = plugins.map(createPlugin)
    }

    usedPluginsListCache.current = _plugins

    const ws = createWavesurfer({
      container,
      height: 150,
      backend: 'MediaElementWebAudio', //* Necesito esto para el streaming
      splitChannelsOptions: {
        overlay: false,
        filterChannels: [],
        channelColors: {
          0: {
            progressColor: '#7DD7EF',
            waveColor: '#7DD7EF'
          },
          1: {
            progressColor: '#6A59A3',
            waveColor: '#6A59A3'
          }
        }
      },
      ...props,
      plugins: _plugins
    })

    if (audio) {
      //* Debemos mandar un media element para mantener el streaming
      const webAudio = new Audio(audio.url)

      webAudio.crossOrigin = 'anonymous'

      ws.load(webAudio, audio.peek, audio.preload)
    }

    onMount?.(ws)

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [container, audio?.url, audio?.peek])

  useEffect(() => {
    if (wavesurfer) {
      const nextPluginsMap = plugins.map(createPlugin)

      const { disabled, enabled } = getDifference(
        usedPluginsListCache.current,
        nextPluginsMap
      )

      usedPluginsListCache.current = nextPluginsMap

      disabled.forEach((plugin) => {
        if (!plugin.name) return
        wavesurfer?.destroyPlugin(plugin.name)
      })

      enabled.forEach((plugin) => {
        if (!plugin.name) return
        wavesurfer?.addPlugin(plugin).initPlugin(plugin.name)
      })
    }
  }, [plugins])

  return wavesurfer
}

export default useWavesurfer

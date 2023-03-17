import { useEffect, useRef, useState } from 'react'
import { PluginDefinition } from 'wavesurfer.js/types/plugin'
import createWavesurfer, {
  WaveSurfer as WaveSurferRef,
  WaveSurfer
} from '../utils/createWavesurfer'
import createPlugin from '../utils/createPlugin'
import getDifference from '../utils/getDifference'
import { PluginType } from '../types'

interface UseWaveSurferParams {
  container?: string | HTMLElement | null
  plugins: PluginType[]
  onMount: (wavesurferRef: null | WaveSurferRef) => any
}

const useWavesurfer = ({
  container,
  plugins = [],
  onMount,
  ...props
}: UseWaveSurferParams): WaveSurfer | null => {
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
      ...props,
      plugins: _plugins
    })

    onMount?.(ws)

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [container])

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

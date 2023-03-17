/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from 'react'
import WaveSurferContext from '../contexts/WaveSurferContext'
import { WaveSurfer as WaveSurferRef } from '../utils/createWavesurfer'
import useWavesurfer from '../hooks/useWavesurfer'

import { Plugins } from '../types'

import usePlugins from '../hooks/usePlugins'
import { WaveSurferParams } from 'wavesurfer.js/types/params'
import useRegions from '../hooks/useRegions'
import Region from '../components/Region'
import useWavesurferControls from '../hooks/useWavesurferControls'
import ZoomController from 'components/WavesurferBH/components/ZoomControler'
import RangeControl from 'components/WavesurferBH/components/RangeControl'
import PlayButtons from 'components/WavesurferBH/components/PlayButtons'
import { SpeedControl } from 'components/WavesurferBH/components/SpeedControl'
import VolumenControl from 'components/WavesurferBH/components/VolumenControl'
import Equalizer from 'components/WavesurferBH/components/Equalizer'

export interface WaveSurferProps {
  plugins: Plugins
  config: Omit<WaveSurferParams, 'container' | 'plugins'>
  onMount: (wavesurferRef: null | WaveSurferRef) => any
}

const WaveSurfer = (props: WaveSurferProps): ReactElement => {
  const plugins = usePlugins({
    plugins: props.plugins,
    timeline: '#timeline',
    minimap: '#minimap'
  })

  const wavesurfer = useWavesurfer({
    plugins,
    container: '#form',
    ...props.config,
    onMount: props.onMount
  })

  const controls = useWavesurferControls(wavesurfer)
  const regions = useRegions(wavesurfer)

  return (
    <WaveSurferContext.Provider value={wavesurfer}>
      <div className="flex gap-2 mb-1">
        <div className="border border-primary-300 flex-1 rounded-lg p-2">
          <div id="minimap" />
        </div>
        <ZoomController
          value={controls.zoom}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
          onChange={(e) => {
            controls.setZoom(e.target.value)
          }}
        />
      </div>
      <div id="timeline" />
      <div id="form" />
      <div className="bg-secondary p-4 flex gap-10">
        <div className="flex-1">
          <RangeControl
            start={0}
            end={controls.duration}
            onChange={(value) => {
              controls.play(...value)
            }}
          />
        </div>
        <div className="w-3/6">
          <PlayButtons
            isReady={true}
            isPlaying={controls.isPlaying}
            process={controls.audioProcess}
            duration={controls.duration}
            onPlayPause={controls.playPause}
            onBackward={controls.skipBackward}
            onForward={controls.skipForward}
          />
        </div>
        <div className="flex-1 space-y-4">
          <SpeedControl value={controls.speed} onClick={controls.setSpeed} />
          <VolumenControl
            value={controls.volume}
            onChange={(e) => {
              controls.setVolume(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="bg-secondary flex justify-center">
        <div className="w-3/6">
          <Equalizer
            filters={controls.filters}
            onChange={controls.setFilters}
          />
        </div>
      </div>

      {regions.map((regionProps) => (
        <Region key={regionProps.id} {...regionProps} />
      ))}
    </WaveSurferContext.Provider>
  )
}

WaveSurfer.defaultProps = {
  plugins: [],
  config: {
    responsive: true,
    waveColor: '#9fa1a6',
    barGap: 2,
    barWidth: 1,
    barRadius: 2,
    cursorWidth: 3,
    cursorColor: '#6366f1'
  }
}

export default WaveSurfer

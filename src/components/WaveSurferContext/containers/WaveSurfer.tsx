/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from 'react'

import { WsProps } from '../types'

import WaveSurferContext from '../contexts/WaveSurferContext'
import useWavesurfer from '../hooks/useWavesurfer'
import usePlugins from '../hooks/usePlugins'
import useRegions from '../hooks/useRegions'
import { useHotkeys } from '../hooks/useHotkeys'
import useWavesurferControls from '../hooks/useWavesurferControls'

import RegionWs from '../components/Region'
import ZoomController from '../components/ZoomControler'
import RangeControl from '../components/RangeControl'
import PlayButtons from '../components/PlayButtons'
import { SpeedControl } from '../components/SpeedControl'
import VolumenControl from '../components/VolumenControl'
import Equalizer from '../components/Equalizer'
import clsx from 'clsx'
import { ArrowDownTrayIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useIntl } from 'react-intl'
import { messages } from '../messages'
import Tooltip from 'components/Tooltip'
import '../styles.css'

const WaveSurfer = (props: WsProps): ReactElement => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(true)
  const { formatMessage } = useIntl()

  // Definicion de plugins
  const plugins = usePlugins({
    plugins: props.plugins,
    timeline: '#timeline',
    minimap: '#minimap'
  })

  // Creacion de wavesurfer
  const wavesurfer = useWavesurfer({
    plugins,
    container: '#form',
    splitChannels: props.splitChannels,
    ...props.config,
    audio: props.audio,
    onMount: props.onMount
  })

  const controls = useWavesurferControls(wavesurfer)
  useHotkeys(controls)
  const regions = useRegions(wavesurfer, props.regions)

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on('ready', () => {
        setIsReady(true)
      })
    }
  }, [wavesurfer])
  useEffect(() => {
    if (props.wsRef) {
      props.wsRef({ wavesurfer, controls, regions })
    }
  }, [wavesurfer, controls, regions])

  const Region = props.CustomRegion ?? RegionWs

  return (
    <WaveSurferContext.Provider
      value={{ wavesurfer, controls, regions, isReady }}
    >
      <div className="flex gap-2 mb-1">
        <div
          className={clsx('border border-primary-300 flex-1 rounded-lg p-2', {
            hidden: !props.showMinimap
          })}
        >
          <div id="minimap" />
        </div>

        <div className="flex gap-3 items-center">
          {props.showZoom && <ZoomController />}
          {props.onDownload && (
            <Tooltip
              content="Descargar audio"
              className="h-5 w-5"
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <button
                onClick={props.onDownload}
                className="text-secondary-gray hover:enabled:text-secondary rounded-md"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      <div
        id="timeline"
        className={clsx({ hidden: !props.showWave || !props.showTimeline })}
      />
      <div
        id="form"
        className={clsx({
          hidden: !props.showWave,
          'pointer-events-none': props.lockEvents
        })}
      />
      <div className="bg-secondary p-4 flex gap-10">
        <div className="flex-1 space-y-2">
          <RangeControl />
          {props.showEqualizer && (
            <button
              className="hover:enabled:bg-white group rounded-md px-2 py-0.5 mr-2 transition-colors flex items-center gap-2 text-sm"
              onClick={() => setExpanded((exp) => !exp)}
            >
              <span className="text-white group-hover:group-enabled:text-primary">
                {formatMessage(messages.equalizer)}
              </span>
              <ChevronUpIcon
                className={clsx(
                  'w-4 h-4 text-white group-hover:group-enabled:text-primary transition-transform duration-500',
                  expanded ? 'rotate-180' : ''
                )}
              />
            </button>
          )}
        </div>
        <div className="w-3/6">
          <PlayButtons />
        </div>
        <div className="flex-1 space-y-4">
          <SpeedControl />
          <VolumenControl />
        </div>
      </div>
      {props.showEqualizer && (
        <div
          className={clsx(
            'bg-secondary flex justify-center overflow-hidden transition-all duration-700',
            expanded ? 'max-h-[300px]' : 'max-h-0'
          )}
        >
          <div
            className={clsx(
              'w-9/12 mt-4 flex items-center gap-2 transition-opacity duration-500',
              expanded ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Equalizer />
          </div>
        </div>
      )}

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
  },
  splitChannels: false,

  showMinimap: false,
  showTimeline: false,
  showWave: false,
  showZoom: false,
  showEqualizer: false
}

export default WaveSurfer

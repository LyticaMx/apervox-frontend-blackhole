import { ReactElement } from 'react'
import {
  MagnifyingGlassIcon,
  SpeakerWaveIcon,
  WrenchIcon
} from '@heroicons/react/20/solid'
import Menu from 'components/Menu'
import Slider from 'components/Slider'
import Equalizer from './Equalizer'

interface Props {
  zoom?: number
  onChangeZoom?: (zoom: number) => void
  volume?: number
  onChangeVolume?: (volume: number) => void
  equalizerFilters?: any[]
  onChangeFilters?: (newFilters: any[]) => void
}

const OptionButtons = ({
  zoom,
  onChangeZoom,
  volume,
  onChangeVolume,
  equalizerFilters,
  onChangeFilters
}: Props): ReactElement => {
  return (
    <div className="pl-12 flex justify-evenly">
      {zoom !== undefined ? (
        <Menu title={MagnifyingGlassIcon} position="top">
          <div className="px-2 py-6 flex flex-col items-center">
            <p>Zoom</p>
            <Slider
              id="wavesurfer-volume"
              value={zoom}
              onChange={(e) => {
                if (onChangeZoom) {
                  onChangeZoom(e.target.value)
                }
              }}
            />
          </div>
        </Menu>
      ) : null}
      {volume !== undefined ? (
        <Menu title={SpeakerWaveIcon} position="top">
          <div className="px-2 py-6 flex flex-col items-center">
            <p>Volume</p>
            <Slider
              id="wavesurfer-volume"
              value={volume}
              onChange={(e) => {
                if (onChangeVolume) {
                  onChangeVolume(e.target.value)
                }
              }}
            />
          </div>
        </Menu>
      ) : null}
      {equalizerFilters && (
        <Menu title={WrenchIcon} position="top">
          <div className="px-2 py-6 flex flex-col items-center">
            <p>Equalizer</p>
            <Equalizer
              filters={equalizerFilters}
              onChangeFilters={(newFilters: any[]) => {
                if (onChangeFilters) {
                  onChangeFilters(newFilters)
                }
              }}
            />
          </div>
        </Menu>
      )}
    </div>
  )
}

export default OptionButtons

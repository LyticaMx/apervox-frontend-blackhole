import { ReactElement, useRef, useState } from 'react'
import WaveSurfer from 'components/WaveSurferContext'
import Card from 'components/Card'
import { regions, transcriptionRegions } from 'dumy/data'
import Switch from 'components/Form/Switch'
import CustomRegion from './components/CustomRegion'
import Button from 'components/Button'

const DemoEfra = (): ReactElement => {
  const audios = ['/adriana_R_001.m4a', '/luis_g_002.wav']
  const [useCustomRegion, setUseCustomRegion] = useState<boolean>(false)

  const $ws = useRef<any>()

  return (
    <div>
      <Card>
        <WaveSurfer
          plugins={['Regions', 'Timeline', 'Minimap']}
          regions={useCustomRegion ? transcriptionRegions : regions}
          audio={{
            url: audios[1]
          }}
          wsRef={(ref) => ($ws.current = ref)}
          splitChannels
          showEqualizer
          showMinimap
          showWave
          showTimeline
          showZoom
          CustomRegion={useCustomRegion ? CustomRegion : undefined}
        />
        <div className="mt-4">
          <Switch
            value={useCustomRegion}
            onChange={setUseCustomRegion}
            color="primary"
          />
          <Button
            className="ml-4"
            color="primary"
            variant="contained"
            onClick={() => $ws.current.wavesurfer.regions.clear()}
          >
            Eliminar
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default DemoEfra

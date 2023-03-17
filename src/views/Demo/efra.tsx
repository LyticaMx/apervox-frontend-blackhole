import { ReactElement, useRef } from 'react'

import WaveSurfer from 'components/WaveSurferContext'
import Card from 'components/Card'
import { regions } from 'dumy/data'

const DemoEfra = (): ReactElement => {
  const audios = ['/adriana_R_001.m4a', '/luis_g_002.wav']

  const $ws = useRef<any>()

  return (
    <div>
      <Card>
        <WaveSurfer
          plugins={['Regions', 'Timeline', 'Minimap']}
          regions={regions}
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
        />
      </Card>
    </div>
  )
}

export default DemoEfra

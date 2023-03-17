/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useCallback, useMemo, useRef } from 'react'

import { WaveSurfer } from 'components/WaveSurferContext'
import Card from 'components/Card'
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline'
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers'

const DemoEfra = (): ReactElement => {
  // const [regionSelected, setRegionSelected] = useState(null)
  const audios = ['/adriana_R_001.m4a', '/luis_g_002.wav']

  const wavesurferRef = useRef<any>()
  const handleWSMount = useCallback((waveSurfer) => {
    console.log(
      '🚀 ~ file: efra.tsx:36 ~ handleWSMount ~ waveSurfer:',
      waveSurfer
    )

    wavesurferRef.current = waveSurfer

    if (wavesurferRef.current) {
      wavesurferRef.current.load(audios[1])
    }
  }, [])

  return (
    <div>
      <Card>
        <WaveSurfer
          plugins={['Regions', 'Timeline', 'Minimap']}
          onMount={handleWSMount}
        />
      </Card>
    </div>
  )
}

export default DemoEfra

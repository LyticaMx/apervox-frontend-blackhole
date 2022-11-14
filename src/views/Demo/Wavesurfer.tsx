import { ReactElement, useState } from 'react'

import WaveSurfer, { Region } from 'components/Wavesurfer'

import { regions } from 'dummy/data'

import ChildrenWave from './Wavesurfer/Children'
import Drawer from 'components/Drawer'
import Button from 'components/Button'

const DemoWavesurfer = (): ReactElement => {
  const [regionSelected, setRegionSelected] = useState(null)
  const [open, setOpen] = useState(false)

  return (
    <div>
      <WaveSurfer
        wave
        zoom
        volume
        equalizer
        audio={{
          id: 'audio-1',
          name: 'Audio 1',
          duration: 44,
          url: 'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
        }}
        defaultRegionColor={process.env.REACT_APP_WAVESURFER_REGION_COLOR}
        regions={regions}
        interactive
        onClick={(region: Region) => setRegionSelected(region as any)}
      >
        <ChildrenWave
          regionSelected={regionSelected as any}
          onAction={() => setRegionSelected(null)}
        />
      </WaveSurfer>

      <Button
        variant="contained"
        className="fixed bottom-0 left-1/2 bg-sky-500 text-white hover:bg-sky-600 mt-20"
        onClick={() => setOpen(true)}
      >
        Open in Drawer
      </Button>

      {/* On Drawer */}
      <Drawer open={open} placement="bottom" onClose={() => setOpen(false)}>
        <WaveSurfer
          wave
          zoom
          volume
          equalizer
          audio={{
            id: 'audio-1',
            name: 'Audio 1',
            duration: 44,
            url: 'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
          }}
          defaultRegionColor={process.env.REACT_APP_WAVESURFER_REGION_COLOR}
          regions={regions}
          onClick={(region: Region) => setRegionSelected(region as any)}
        />
      </Drawer>
    </div>
  )
}

export default DemoWavesurfer

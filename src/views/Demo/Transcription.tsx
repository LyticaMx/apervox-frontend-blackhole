import { ReactElement, useRef, useState } from 'react'
import Editor from 'components/Transcription/Editor'
import WaveSurferPlayer from 'components/Wavesurfer'
import AudioPrueba from 'assets/audio/0989123090_20220128_173052_2_000126.wav'
import Pagination from 'components/Transcription/Pagination'
import { getAudioIntervals } from 'utils/getAudioRanges'

const Transcription = (): ReactElement => {
  const [currentTime, setCurrentTime] = useState(0)
  const [currentInterval, setCurrentInterval] = useState('00:00 - 00:30')
  const [transcription, setTranscription] = useState(
    getAudioIntervals(86).reduce((old, key) => {
      old[key] = ''
      return old
    }, {})
  )
  const lastIntervalRef = useRef(currentInterval)

  return (
    <div>
      <WaveSurferPlayer
        wave
        volume
        audio={{
          id: 'audio-1',
          name: 'Audio 1',
          duration: 86,
          url: AudioPrueba
        }}
        defaultRegionColor={process.env.REACT_APP_WAVESURFER_REGION_COLOR}
        onAudioProcess={(processed) => setCurrentTime(Math.floor(processed))}
      />

      <Editor
        initialData={transcription[currentInterval]}
        currentInterval={currentInterval}
        saveData={(data) => {
          if (currentInterval !== lastIntervalRef.current) {
            setTranscription({
              ...transcription,
              [lastIntervalRef.current]: data
            })
            lastIntervalRef.current = currentInterval
          }
        }}
      />
      <div className="flex place-content-end">
        <Pagination
          audio={{ duration: 86, currentTime }}
          onPageChange={(interval) => setCurrentInterval(interval)}
        />
      </div>
    </div>
  )
}

export default Transcription

import { ReactElement, useCallback, useRef, useState } from 'react'

import AudioButton from 'components/AudioButton'
import { useCalls } from 'context/Calls'

interface IconProps {
  id: string
}
const useAudio = (): [(props: IconProps) => ReactElement, () => void] => {
  const { actions } = useCalls()
  const [audioPlaying, setAudioPlaying] = useState<string>('')
  const soundPlaying = useRef<any>()

  const handlePlayAudio = async (id): Promise<void> => {
    stop()

    if (audioPlaying !== id) {
      const res = await actions?.playCall(id)

      if (res) {
        setAudioPlaying(id)
        const sound = new Audio(res)
        soundPlaying.current = sound

        sound.play()
      }
    } else {
      setAudioPlaying('')
    }
  }

  const Icon = useCallback(
    ({ id }: IconProps) => (
      <AudioButton
        isPlaying={id === audioPlaying}
        onClick={() => {
          handlePlayAudio(id)
        }}
      />
    ),
    [audioPlaying]
  )

  const stop = (): void => {
    if (soundPlaying.current) {
      soundPlaying.current.pause()
    }
  }

  return [Icon, stop]
}

export default useAudio

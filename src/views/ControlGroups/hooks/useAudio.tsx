import { ReactElement, useCallback, useRef, useState } from 'react'

import { useControlGroups } from 'context/ControlGroups'
import AudioButton from 'components/AudioButton'

interface IconProps {
  id: string
}
const useAudio = (): [(props: IconProps) => ReactElement, () => void] => {
  const { actions } = useControlGroups()
  const [audioPlaying, setAudioPlaying] = useState<string>('')
  const soundPlaying = useRef<any>()

  const handlePlayAudio = async (id): Promise<void> => {
    stop()

    if (audioPlaying !== id) {
      const res = await actions?.playAudio(id)

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

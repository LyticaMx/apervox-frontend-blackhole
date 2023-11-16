import { useAuth } from 'context/Auth'
import { RefObject, useEffect } from 'react'

const useAudioCall = (
  audioRef: RefObject<HTMLAudioElement>,
  evidenceID: string = ''
): void => {
  const {
    auth: { token },
    actions: authActions
  } = useAuth()

  const loadAudio = async (): Promise<void> => {
    if (!audioRef.current) return
    await authActions?.refreshToken()
    audioRef.current.src = `${process.env.REACT_APP_MAIN_BACKEND_URL}call-evidences/${evidenceID}/compressed-audio?extension=opus&token=${token}`
  }

  useEffect(() => {
    if (!evidenceID) return
    loadAudio()

    return () => {
      if (!audioRef.current) return
      audioRef.current.src = ''
    }
  }, [evidenceID])
}

export default useAudioCall

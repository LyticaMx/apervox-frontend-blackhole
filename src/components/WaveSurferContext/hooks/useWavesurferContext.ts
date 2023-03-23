import WaveSurferContext, { WsContext } from '../contexts/WaveSurferContext'
import { useContext } from 'react'

const useWavesurferContext = (): WsContext => {
  return useContext(WaveSurferContext)
}

export default useWavesurferContext

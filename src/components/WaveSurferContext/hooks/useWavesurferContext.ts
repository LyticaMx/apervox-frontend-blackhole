import WaveSurferContext from '../contexts/WaveSurferContext'
import { useContext } from 'react'

const useWavesurferContext = (): any => {
  return useContext(WaveSurferContext)
}

export default useWavesurferContext

import { createContext } from 'react'
import WaveSurfer from 'wavesurfer.js/src/wavesurfer'

interface WsContext {
  wavesurfer: WaveSurfer | null
  controls?: any
  regions?: any
  isReady: boolean
}

const WaveSurferContext = createContext<WsContext>({
  wavesurfer: null,
  isReady: false
})

export default WaveSurferContext

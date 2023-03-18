import WaveSurfer from 'wavesurfer.js'
import { WaveSurferParams } from 'wavesurfer.js/types/params'

const createWavesurfer = (options: WaveSurferParams): WaveSurfer => {
  return WaveSurfer.create(options)
}

export default createWavesurfer

export { WaveSurfer }

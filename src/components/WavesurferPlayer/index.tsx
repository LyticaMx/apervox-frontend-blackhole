/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect } from 'react'
import { map } from 'lodash'
import { useIntl } from 'react-intl'

import Card from 'components/Card'
import Grid from 'components/Grid'
import IconButton from 'components/Button/IconButton'
import EqualizerControl from './components/EqualizerControl'
import RegionMenu from './components/RegionMenu'

import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'

import { useHotkeys } from './hooks/useHotkeys'
import { useWavesurfer } from './hooks/useWavesurfer'
import { messages } from './messages'

interface Props {
  audioUrl: string
  onChangeRegions?: () => void
  onAudioClick?: () => void
  wavesurferRef?: any
  audioWave?: any
  regions?: any
}

const WavesurferPlayer = memo((props: Props) => {
  const {
    onChangeRegions,
    onAudioClick,
    audioUrl,
    wavesurferRef,
    audioWave,
    regions
  } = props
  const { formatMessage } = useIntl()
  const {
    equalizerFilters,
    handleEqualizerChange,
    handleZoomIn,
    handleZoomOut,
    handleZoomChange,
    handleVolumeChange,
    handleRewind,
    handleFastForward,
    handlePlay,
    handlePause,
    handleStop,
    toggleContinuousPlay,
    handleSpeed,
    playRegionLoop,
    toggleShowRegionMenu,
    zoom,
    volume,
    speed,
    continuousPlay,
    speedMarks,
    wavesurfer,
    showRegionMenu,
    annotationRef,
    regionSelected,
    regionMenuCoords,
    regionHandler,
    timeSkipMarks,
    skip,
    getSkip,
    handleSkipChange
  } = useWavesurfer({
    onChangeRegions,
    onAudioClick,
    audioUrl,
    wavesurferRef,
    audioWave,
    regions
  })

  const wavesurferControls = useWavesurfer({
    onChangeRegions,
    onAudioClick,
    audioUrl,
    wavesurferRef,
    audioWave,
    regions
  })

  useEffect(() => {
    if (wavesurferControls.wavesurfer) {
      wavesurferControls.wavesurfer.on('ready', () => {
        console.log('🚀 ~ controls', wavesurferControls)
        wavesurferControls.wavesurfer.setVolume(1)
        wavesurferControls.wavesurfer.play()
      })
    }
  }, [wavesurferControls.wavesurfer])

  return (
    <div>
      <div id="wave-minimap"></div>
      <div id="wave-timeline"></div>
      <div id="waveform"></div>
    </div>
  )
  // useHotkeys(wavesurfer, getSkip)

  // return (
  //   <Card>
  //     <div className="p-1 my-2">
  //       <div id="wave-minimap"></div>
  //       <div id="wave-timeline"></div>
  //       <div id="waveform"></div>
  //       <div>
  //         <div>
  //           <IconButton onClick={handleZoomOut}>
  //             <MagnifyingGlassMinusIcon />
  //           </IconButton>
  //           <input
  //             type="range"
  //             min="0"
  //             max="300"
  //             step="15"
  //             value={zoom}
  //             onChange={handleZoomChange}
  //           />
  //           <IconButton onClick={handleZoomIn}>
  //             <MagnifyingGlassPlusIcon />
  //           </IconButton>
  //         </div>
  //       </div>
  //       {/* <div className="flex justify-center items-center p-2">
  //         <div className="mr-auto">
  //           <IconButton onClick={() => setExpanded(!expanded)}>
  //             {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
  //           </IconButton>
  //         </div>
  //         <IconButton onClick={handleRewind}>
  //           <SkipPreviousIcon />
  //         </IconButton>
  //         <IconButton onClick={handleStop}>
  //           <StopIcon />
  //         </IconButton>
  //         <IconButton onClick={handlePlay}>
  //           <PlayArrowIcon />
  //         </IconButton>
  //         <IconButton onClick={handlePause}>
  //           <PauseIcon />
  //         </IconButton>
  //         <IconButton onClick={handleFastForward}>
  //           <SkipNextIcon />
  //         </IconButton>
  //         <div className="ml-auto">
  //           <IconButton
  //             onClick={toggleContinuousPlay}
  //             color={continuousPlay ? 'primary' : ''}
  //           >
  //             <LoopIcon />
  //           </IconButton>
  //         </div>
  //       </div> */}

  //       <Grid>
  //         <Grid item md={5} lg={3}>
  //           <Grid>
  //             <Grid item>{/* <VolumeDownIcon /> */}</Grid>
  //             <Grid item>
  //               {/* <Slider
  //                 step={10}
  //                 value={volume}
  //                 onChange={handleVolumeChange}
  //                 marks
  //                 min={0}
  //                 max={100}
  //                 valueLabelDisplay="auto"
  //               /> */}
  //             </Grid>
  //             <Grid item>{/* <VolumeUpIcon /> */}</Grid>
  //           </Grid>
  //           <Grid>
  //             <Grid item>{/* <ColdIcon /> */}</Grid>
  //             <Grid item>
  //               {/* <Slider
  //                 step={smUp ? null : 20}
  //                 value={speed}
  //                 onChange={handleSpeed}
  //                 min={0}
  //                 max={100}
  //                 marks={smUp ? speedMarks : true}
  //               /> */}
  //             </Grid>
  //             <Grid item>{/* <FireIcon /> */}</Grid>
  //           </Grid>
  //           <Grid>
  //             <Grid item>{/* <HistoryIcon /> */}</Grid>
  //             <Grid item>
  //               {/* <Slider
  //                 step={50}
  //                 value={skip}
  //                 onChange={handleSkipChange}
  //                 min={0}
  //                 max={100}
  //                 marks={smUp ? timeSkipMarks : true}
  //               /> */}
  //             </Grid>
  //             <Grid item>{/* <UpdateIcon /> */}</Grid>
  //           </Grid>
  //         </Grid>
  //         <Grid item={12} md={7} lg={5}>
  //           <div className="text-center">
  //             <span>{formatMessage(messages.equalizer)}</span>
  //             <Grid>
  //               <Grid item>
  //                 <div className="flex flex-col justify-end text-sm h-full">
  //                   <div className="mt-auto">
  //                     <span>{formatMessage(messages.decibels)}</span>
  //                   </div>
  //                   <div className="mt-auto">
  //                     <span>{formatMessage(messages.hertz)}</span>
  //                   </div>
  //                 </div>
  //               </Grid>
  //               <Grid item>
  //                 <div className="flex items-center justify-around">
  //                   {map(equalizerFilters, (filter, i) => (
  //                     <EqualizerControl
  //                       key={i}
  //                       index={i}
  //                       filter={filter}
  //                       onChange={handleEqualizerChange}
  //                     />
  //                   ))}
  //                 </div>
  //               </Grid>
  //             </Grid>
  //           </div>
  //         </Grid>
  //       </Grid>
  //       <div ref={annotationRef} />
  //       <div>
  //         {showRegionMenu && (
  //           <RegionMenu
  //             region={regionSelected}
  //             coords={regionMenuCoords}
  //             onClose={toggleShowRegionMenu}
  //             onDeleteRegion={regionHandler?.deleteRegion}
  //             onPlayRegionLoop={playRegionLoop}
  //           />
  //         )}
  //       </div>
  //     </div>
  //   </Card>
  // )
})

WavesurferPlayer.displayName = 'WavesurferPlayer'

export default WavesurferPlayer

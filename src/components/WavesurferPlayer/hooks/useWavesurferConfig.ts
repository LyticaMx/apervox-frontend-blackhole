import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min'
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min'
import { secondsToString } from '../helpers'

export const useWavesurferConfig = (): any => {
  const blue = '#41CBFF'
  const purple = '#7105C0'
  const bgColor = 'white'

  const timelinePlugin = TimelinePlugin.create({
    deferInit: true,
    container: '#wave-timeline',
    notchPercentHeight: 50,
    primaryFontColor: 'red',
    secondaryFontColor: 'red',
    primaryColor: 'red',
    secondaryColor: 'red',
    primaryLabelInterval: 1,
    zoomDebounce: 300
  })

  const plugins = [
    MinimapPlugin.create({
      container: '#wave-minimap',
      waveColor: purple,
      progressColor: purple,
      backgroundColor: bgColor,
      height: 40
    }),

    RegionsPlugin.create({
      preventContextMenu: true,
      dragSelection: { slop: 5 }
    }),
    CursorPlugin.create({
      showTime: true,
      opacity: 1,
      customShowTimeStyle: {
        'background-color': blue,
        color: 'white',
        padding: '0.4rem',
        'font-size': '10px'
      },
      formatTimeCallback: (timeInSeconds) =>
        secondsToString(timeInSeconds, { milis: true })
    }),
    timelinePlugin
  ]

  const EQ = [
    {
      f: 32,
      type: 'lowshelf'
    },
    {
      f: 64,
      type: 'peaking'
    },
    {
      f: 125,
      type: 'peaking'
    },
    {
      f: 250,
      type: 'peaking'
    },
    {
      f: 500,
      type: 'peaking'
    },
    {
      f: 1000,
      type: 'peaking'
    },
    {
      f: 2000,
      type: 'peaking'
    },
    {
      f: 4000,
      type: 'peaking'
    },
    {
      f: 8000,
      type: 'peaking'
    },
    {
      f: 16000,
      type: 'highshelf'
    }
  ]

  const splitChannelsOptions = {
    overlay: false,
    filterChannerls: [],
    channelColors: {
      0: { progressColor: '#7DD7EF', waveColor: '#7DD7EF' },
      1: { progressColor: '#6A59A3', waveColor: '#6A59A3' }
    }
  }

  return { plugins, EQ, splitChannelsOptions, timelinePlugin }
}

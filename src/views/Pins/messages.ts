import { defineMessages } from 'react-intl'

export const chunkMessages = defineMessages({
  totalOfChunks: {
    id: 'views.Pins.ChunkSection.totalOfChunks',
    defaultMessage: 'Total de lotes registrados'
  },
  addChunk: {
    id: 'views.Pins.ChunkSection.addChunk',
    defaultMessage: 'Agregar lote'
  },
  addChunkTitleConfirm: {
    id: 'views.Pins.ChunkSection.addChunkTitleConfirm',
    defaultMessage: 'Agregar un nuevo lote'
  },
  addChunkQuestion: {
    id: 'views.Pins.ChunkSection.addChunkQuestion',
    defaultMessage: '¿Seguro que desea agregar un nuevo lote?'
  }
})

export const pinsMessages = defineMessages({
  totalOfPins: {
    id: 'views.Pins.PinSection.totalOfPins',
    defaultMessage: 'Total de PINs registrados'
  },
  linkPin: {
    id: 'views.Pins.PinSection.linkPin',
    defaultMessage: 'Asignar PIN'
  },
  unlinkPinAlert: {
    id: 'views.Pins.PinSection.unlinkPinAlert',
    defaultMessage: '¿Seguro que desea desvincular este PIN?'
  },
  withoutSpeaker: {
    id: 'views.Pins.PinSection.withoutSpeaker',
    defaultMessage: 'Sin hablante'
  },
  selectSpeakerToLink: {
    id: 'views.Pins.PinSection.selectSpeakerToLink',
    defaultMessage: 'Seleccionar el hablante a vincular'
  },
  selectPin: {
    id: 'views.Pins.PinSection.selectPin',
    defaultMessage: 'Selecciona un pin'
  },
  selectSpeaker: {
    id: 'views.Pins.PinSection.selectSpeaker',
    defaultMessage: 'Selecciona un hablante'
  }
})

import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.Calls.title',
    defaultMessage: 'Llamadas'
  },
  totalOfCalls: {
    id: 'views.Calls.totalOfCalls',
    defaultMessage: 'Total de llamadas'
  },
  usedPins: {
    id: 'views.Calls.usedPins',
    defaultMessage: 'PINs utilizados'
  },
  activityOfCalls: {
    id: 'views.Calls.activityOfCalls',
    defaultMessage: 'Actividad de llamadas'
  },
  listOfCalls: {
    id: 'views.Calls.listOfCalls',
    defaultMessage: 'Lista de llamadas'
  },
  activityOfCallsByPeriod: {
    id: 'views.Calls.activityOfCallsByPeriod',
    defaultMessage: 'Actividad de llamadas durante el periodo seleccionado'
  },
  activityByPin: {
    id: 'views.Calls.activityByPin',
    defaultMessage: 'Actividad por PIN'
  },
  mostActivityPins: {
    id: 'views.Calls.mostActivityPins',
    defaultMessage: 'PINs con mayor actividad'
  },
  backToAllCalls: {
    id: 'views.Calls.backToAllCalls',
    defaultMessage: 'Regresar a todas las llamadas'
  },
  allCalls: {
    id: 'views.Calls.allCalls',
    defaultMessage: 'Todas'
  },
  withAlert: {
    id: 'views.Calls.withAlert',
    defaultMessage: 'Con alerta'
  },
  withoutAlert: {
    id: 'views.Calls.withoutAlert',
    defaultMessage: 'Sin alerta'
  }
})

export const detailMessages = defineMessages({
  backToCallButton: {
    id: 'views.Calls.Detail.backToCallButton',
    defaultMessage: 'Volver a todas las llamadas'
  },
  title: {
    id: 'views.Calls.Detail.title',
    defaultMessage: 'Detalles de llamada'
  },
  addTag: {
    id: 'views.Calls.Detail.addTag',
    defaultMessage: 'Añadir etiqueta'
  },
  transcriptionToText: {
    id: 'views.Calls.Detail.transcriptionToText',
    defaultMessage: 'Transcripción a texto'
  },
  voiceprintSimilarity: {
    id: 'views.Calls.Detail.voiceprintSimilarity',
    defaultMessage: 'Similitud con huella de voz'
  },
  wordsAbundance: {
    id: 'views.Calls.Detail.wordsAbundance',
    defaultMessage: 'Abundancia de palabras'
  },
  transcriptionBySegment: {
    id: 'views.Calls.Detail.transcriptionBySegment',
    defaultMessage: 'Transcripción por segmento'
  },
  transcriptionBySegmentDescription: {
    id: 'views.Calls.Detail.transcriptionBySegmentDescription',
    defaultMessage:
      'Puedes editar la transcripción de cada uno de los segmentos de forma independiente.'
  },
  linkedTags: {
    id: 'views.Calls.Detail.linkedTags',
    defaultMessage: 'Etiquetas vinculadas'
  }
})

export const receivedOptionsMessages = defineMessages({
  generateVoicePrint: {
    id: 'views.Calls.ReceivedOptions.generateVoicePrint',
    defaultMessage: 'Generar huella de voz'
  },
  createBondingNetwork: {
    id: 'views.Calls.ReceivedOptions.createBondingNetwork',
    defaultMessage: 'Crear red de vinculación'
  }
})

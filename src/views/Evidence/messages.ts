import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  saveEvidence: {
    id: 'views.Evidence.saveEvidence',
    defaultMessage: 'Guardar evidencia'
  },
  eventType: {
    id: 'views.Evidence.eventType',
    defaultMessage:
      'Evento de {type,select,audio{audio} doc{documento} image{imagen} video{video} other{otro}}'
  },
  evidenceWorkingTools: {
    id: 'views.Evidence.evidenceWorkingTools',
    defaultMessage: 'Herramientas de trabajo de evidencia'
  },
  eventHistory: {
    id: 'views.Evidence.eventHistory',
    defaultMessage: 'Historial de evento'
  }
})

export const eventInformationMessages = defineMessages({
  eventInformation: {
    id: 'views.Evidence.EventInformation.eventInformation',
    defaultMessage: 'Información del evento'
  },
  eventData: {
    id: 'views.Evidence.EventInformation.eventData',
    defaultMessage: 'Datos del evento.'
  },
  evidenceId: {
    id: 'views.Evidence.EventInformation.evidenceId',
    defaultMessage: 'ID de evento de la evidencia'
  },
  filename: {
    id: 'views.Evidence.EventInformation.filename',
    defaultMessage: 'Nombre del archivo'
  },
  sourceDevice: {
    id: 'views.Evidence.EventInformation.sourceDevice',
    defaultMessage: 'Dispositivo de origen'
  },
  eventLabel: {
    id: 'views.Evidence.EventInformation.eventLabel',
    defaultMessage: 'Rótulo del evento'
  },
  configureEventLabel: {
    id: 'views.Evidence.EventInformation.configureEventLabel',
    defaultMessage: 'Configura el rótulo del evento'
  },
  establishClassification: {
    id: 'views.Evidence.EventInformation.establishClassification',
    defaultMessage: 'Establece la clasificación para esta evidencia'
  },
  starNumber: {
    id: 'views.Evidence.EventInformation.starNumber',
    defaultMessage:
      '{count,plural, one {# estrella} other {# estrellas}} - {meaning}'
  },
  followingEvidence: {
    id: 'views.Evidence.EventInformation.followingEvidence',
    defaultMessage: 'Evidencia en seguimiento'
  },
  // Revisar si estos se utilizaran en otros lados
  tiName: {
    id: 'views.Evidence.EventInformation.tiName',
    defaultMessage: 'Nombre de la T.I.'
  },
  targetPhone: {
    id: 'views.Evidence.EventInformation.targetPhone',
    defaultMessage: 'Número del objetivo'
  }
})

export const eventHistoryMessages = defineMessages({
  movementDate: {
    id: 'views.Evidence.EventHistory.movementDate',
    defaultMessage: 'Fecha del movimiento'
  },
  madeBy: {
    id: 'views.Evidence.EventHistory.madeBy',
    defaultMessage: 'Realizado por'
  },
  performedAction: {
    id: 'views.Evidence.EventHistory.performedAction',
    defaultMessage: 'Acción realizada'
  },
  evidenceSynopsis: {
    id: 'views.Evidence.EventHistory.evidenceSynopsis',
    defaultMessage: 'Sinopsis del evento'
  },
  evidenceSynopsisDescription: {
    id: 'views.Evidence.EventHistory.evidenceSynopsisDescription',
    defaultMessage:
      'Espacio de trabajo para indicar la sinopsis del evento en curso'
  },
  saveSynopsis: {
    id: 'views.Evidence.EventHistory.saveSynopsis',
    defaultMessage: 'Guardar sinopsis'
  },
  evidenceModifications: {
    id: 'views.Evidence.EventHistory.evidenceModifications',
    defaultMessage: 'Modificaciones realizadas a la evidencia.'
  }
})

export const commentsMessages = defineMessages({
  addComment: {
    id: 'views.Evidence.EventHistory.addComment',
    defaultMessage: 'Agregar comentario'
  }
})

export const locationInformationMessages = defineMessages({
  carrier: {
    id: 'views.Evidence.LocationInformation.carrier',
    defaultMessage: 'Compañia u operador telefónico'
  }
})

export const transcriptionTabMessages = defineMessages({
  eventTranscription: {
    id: 'views.Evidence.TranscriptionTab.eventTranscription',
    defaultMessage: 'Transcripción del evento'
  },
  eventTranscriptionSubtitle: {
    id: 'views.Evidence.TranscriptionTab.eventTranscriptionSubtitle',
    defaultMessage:
      'Espacio de trabajo que muestra lo que mencionan los participantes en el evento en curso'
  },
  saveTranscription: {
    id: 'views.Evidence.TranscriptionTab.saveTranscription',
    defaultMessage: 'Guardar transcripción'
  },
  deleteTranscriptionRegion: {
    id: 'views.Evidence.TranscriptionTab.deleteRegion',
    defaultMessage: 'Eliminar segmento'
  },
  deleteTranscriptionRegionQuestion: {
    id: 'views.Evidence.TranscriptionTab.deleteRegionQuestion',
    defaultMessage: '¿Se eliminará el segmento y su transcripción, está seguro?'
  }
})

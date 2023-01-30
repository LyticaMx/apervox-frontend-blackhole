import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  generator: {
    id: 'views.Comparisons.generator',
    defaultMessage: 'Generador de comparaciones'
  },
  comparisonType: {
    id: 'views.Comparisons.comparisonType',
    defaultMessage: 'Seleccione el tipo de comparación a realizar'
  },
  selectSamples: {
    id: 'views.Comparisons.selectSamples',
    defaultMessage: 'Seleccione las muestras a comparar'
  },
  baseVoicePrint: {
    id: 'views.Comparisons.baseVoicePrint',
    defaultMessage: 'Huella de voz base'
  },
  targetVoicePrint: {
    id: 'views.Comparisons.targetVoicePrint',
    defaultMessage: 'Huella de voz objetivo'
  },
  selectedBaseVoiceprint: {
    id: 'views.Comparisons.selectedBaseVoiceprint',
    defaultMessage: 'Huella base seleccionada'
  }
})

export const messages1To1 = defineMessages({
  selectedVoicePrints: {
    id: 'views.Comparisons.selectedVoicePrints',
    defaultMessage: 'Huellas de voz seleccionadas'
  },
  similarityValue: {
    id: 'views.Comparisons.similarityValue',
    defaultMessage: 'Valor de verosimilitud: {similarity}'
  }
})

export const messagesRToR = defineMessages({
  title: {
    id: 'views.Comparisons.ReceiverToReceiver.title',
    defaultMessage: 'Comparación entre receptores'
  },
  subtitle: {
    id: 'views.Comparisons.ReceiverToReceiver.subtitle',
    defaultMessage:
      'Identificar hablantes receptores a nivel redes, para saber si hay hablantes que se comunican con mismos receptores.'
  },
  sampleSelection: {
    id: 'views.Comparisons.ReceiverToReceiver.sampleSelection',
    defaultMessage: 'Selección de muestras'
  },
  forEasySelection: {
    id: 'views.Comparisons.ReceiverToReceiver.forEasySelection',
    defaultMessage:
      'Para facilitar tu elección debes filtrar las muestras por "PIN" y puedes elegir un rango de fechas'
  },
  results: {
    id: 'views.Comparisons.ReceiverToReceiver.results',
    defaultMessage: 'Resultados de verosimilitud'
  },
  resultsDescription: {
    id: 'views.Comparisons.ReceiverToReceiver.resultsDescription',
    defaultMessage:
      'Comparación entre las huellas de voz provenientes de los audios recibidos'
  },
  targetAudio: {
    id: 'views.Comparisons.ReceiverToReceiver.targetAudio',
    defaultMessage: 'Audio objetivo'
  }
})

export const likehoodScaleMessages = defineMessages({
  similarityIndex: {
    id: 'views.Comparisons.LikelihoodScale.similarityIndex',
    defaultMessage: 'Escala indice de verosimilidad'
  },
  weakSupport: {
    id: 'views.Comparisons.LikelihoodScale.weakSupport',
    defaultMessage: 'Apoyo débil'
  },
  moderateSupport: {
    id: 'views.Comparisons.LikelihoodScale.moderateSupport',
    defaultMessage: 'Apoyo moderado'
  },
  strongModerateSupport: {
    id: 'views.Comparisons.LikelihoodScale.strongModerateSupport',
    defaultMessage: 'Apoyo moderado fuerte'
  },
  strongSupport: {
    id: 'views.Comparisons.LikelihoodScale.strongSupport',
    defaultMessage: 'Apoyo fuerte'
  },
  veryStrongSupport: {
    id: 'views.Comparisons.LikelihoodScale.veryStrongSupport',
    defaultMessage: 'Apoyo muy fuerte'
  },
  extremelyStrongSupport: {
    id: 'views.Comparisons.LikelihoodScale.extremelyStrongSupport',
    defaultMessage: 'Apoyo extremadamente fuerte'
  }
})

export const voiceprinSourceMessages = defineMessages({
  selectVoiceprintSource: {
    id: 'views.Comparisons.VoicePrintSource.selectVoiceprintSource',
    defaultMessage: 'Seleccione una fuente de huella de voz'
  },
  voiceprintSource: {
    id: 'views.Comparisons.VoicePrintSource.voiceprintSource',
    defaultMessage: 'Fuente de huella de voz'
  },
  selectPinPlaceholder: {
    id: 'views.Comparisons.VoicePrintSource.selectPinPlaceholder',
    defaultMessage: 'Seleccione un PIN'
  },
  availableVoiceprints: {
    id: 'views.Comparisons.VoicePrintSource.availableVoiceprints',
    defaultMessage: 'Huellas de voz disponibles'
  }
})

export const voiceprintDetailMessages = defineMessages({
  selectVoiceprint: {
    id: 'views.Comparisons.VoicePrintDetail.selectVoiceprint',
    defaultMessage: 'Seleccione una huella de voz'
  },
  totalAssociatedAudio: {
    id: 'views.Comparisons.VoicePrintDetail.totalAssociatedAudio',
    defaultMessage: 'Total de audios asociados: {total}'
  }
})

export const multipleVoicePrintSourceMessages = defineMessages({
  receiver: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.receiver',
    defaultMessage: 'número receptor'
  },
  wasDone: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.wasDone',
    defaultMessage: 'fue realizada'
  },
  wasCreated: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.wasCreated',
    defaultMessage: 'fue creado'
  },
  associatedAudio: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.associatedAudio',
    defaultMessage: 'Audios asociados'
  },
  availableVoiceprints: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.availableVoiceprints',
    defaultMessage: 'Huellas de voz disponibles'
  },
  selectedVoiceprints: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.selectedVoiceprints',
    defaultMessage:
      '{selectable, plural,one {Huella de voz seleccionada} other {Huellas de voz seleccionadas {total}}}'
  },
  filterDetails: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.filterDetails',
    defaultMessage: '{results} resultados para el PIN {pin}'
  },
  fromDate: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.fromDate',
    defaultMessage: ' y fecha a partir de {date}'
  },
  fromDates: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.fromDates',
    defaultMessage: ' y fecha del {from} al {to}'
  },
  addFiltersToStart: {
    id: 'views.Comparisons.MultipleVoicePrintSourceMessages.addFiltersToStart',
    defaultMessage:
      'Agregue un filtro de pin para comenzar con la selección de una muestra'
  }
})

export const assignReceiverDialogMessages = defineMessages({
  selectReceiver: {
    id: 'views.Comparisons.AssignReceiverDialog.selectReceiver',
    defaultMessage: 'Selecciona un receptor'
  },
  assignReceiver: {
    id: 'views.Comparisons.AssignReceiverDialog.assignReceiver',
    defaultMessage: 'Asignar receptor'
  },
  createReceiver: {
    id: 'views.Comparisons.AssignReceiverDialog.createReceiver',
    defaultMessage: 'Agregar receptor'
  },
  advertisement: {
    id: 'views.Comparisons.AssignReceiverDialog.advertisement',
    defaultMessage:
      'Todas las modificaciones realizadas en este apartado quedarán registradas'
  },
  createReceiverLink: {
    id: 'views.Comparisons.AssignReceiverDialog.createReceiverLink',
    defaultMessage: 'No encontraste receptor, agrega uno nuevo'
  },
  pinNumber: {
    id: 'views.Comparisons.AssignReceiverDialog.pinNumber',
    defaultMessage: '{pin} número de pin'
  },
  receiverNumber: {
    id: 'views.Comparisons.AssignReceiverDialog.receiverNumber',
    defaultMessage: '{receiverNumber} número receptor'
  },
  wasDone: {
    id: 'views.Comparisons.AssignReceiverDialog.wasDone',
    defaultMessage: '{date} fue realizada'
  },
  knownReceivers: {
    id: 'views.Comparisons.AssignReceiverDialog.knownReceivers',
    defaultMessage: 'Receptores conocidos'
  },
  selectLocation: {
    id: 'views.Comparisons.AssignReceiverDialog.selectLocation',
    defaultMessage: 'Seleccionar localidad'
  }
})

import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.callsHistory.title',
    defaultMessage: 'Historial de llamadas'
  },
  totalEvents: {
    id: 'views.callsHistory.totalEvents',
    defaultMessage: 'Total eventos'
  },
  unclassified: {
    id: 'views.callsHistory.unclassified',
    defaultMessage: 'Sin clasificar'
  },
  noRelevant: {
    id: 'views.callsHistory.noRelevant',
    defaultMessage: 'No relevante'
  },
  relevant: {
    id: 'views.callsHistory.relevant',
    defaultMessage: 'Relevante'
  },
  withTranscription: {
    id: 'views.callsHistory.withTranscription',
    defaultMessage: 'Con transcripción'
  }
})

export const tableMessages = defineMessages({
  date: {
    id: 'views.callsHistory.table.date',
    defaultMessage: 'Fecha de evento'
  },
  time: {
    id: 'views.callsHistory.table.time',
    defaultMessage: 'Hora de evento'
  },
  operator: {
    id: 'views.callsHistory.table.operator',
    defaultMessage: 'Operadora'
  },
  callType: {
    id: 'views.callsHistory.table.callType',
    defaultMessage: 'Tipo llamada'
  },
  workBy: {
    id: 'views.callsHistory.table.workBy',
    defaultMessage: 'Trabajado por'
  }
})

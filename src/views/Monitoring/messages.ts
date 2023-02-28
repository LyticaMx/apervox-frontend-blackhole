import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.monitoring.title',
    defaultMessage: 'Monitoreo'
  },
  ongoingCalls: {
    id: 'views.monitoring.ongoingCalls',
    defaultMessage: 'Llamadas en curso'
  }
})

export const tableMessages = defineMessages({
  date: {
    id: 'views.monitoring.table.date',
    defaultMessage: 'Fecha de evento'
  },
  time: {
    id: 'views.monitoring.table.time',
    defaultMessage: 'Hora de evento'
  },
  operator: {
    id: 'views.monitoring.table.operator',
    defaultMessage: 'Operadora'
  },
  callType: {
    id: 'views.monitoring.table.callType',
    defaultMessage: 'Tipo llamada'
  }
})

export const tabsMessages = defineMessages({
  monitoring: {
    id: 'views.monitoring.tabs.monitoring',
    defaultMessage: 'Monitoreo'
  },
  history: {
    id: 'views.monitoring.tabs.history',
    defaultMessage: 'Historial de llamdas'
  }
})
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

export const hangUpMessages = defineMessages({
  title: {
    id: 'views.monitoring.hangUp.title',
    defaultMessage: 'Colgar llamada {target}'
  },
  message: {
    id: 'views.monitoring.hangUp.title',
    defaultMessage:
      '¿Estás seguro de querer colgar la llamada del número {target}?'
  },
  passwordConfirm: {
    id: 'views.monitoring.hangUp.passwordConfirm',
    defaultMessage:
      'Ingresa tu contraseña para validar tu identidad y colgar la llamada'
  },
  success: {
    id: 'views.monitoring.hangUp.success',
    defaultMessage: 'Llamada colgada correctamente'
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
  },
  verification: {
    id: 'views.monitoring.table.callType.verification',
    defaultMessage: 'Verificación'
  },
  trash: {
    id: 'views.monitoring.table.callType.trash',
    defaultMessage: 'Basura'
  },
  evidence: {
    id: 'views.monitoring.table.callType.evidence',
    defaultMessage: 'Técnica'
  },
  live: {
    id: 'views.monitoring.table.callStatus.live',
    defaultMessage: 'En vivo'
  },
  ended: {
    id: 'views.monitoring.table.callStatus.ended',
    defaultMessage: 'Finalizada'
  },
  hangUp: {
    id: 'views.monitoring.table.hangUp',
    defaultMessage: 'Colgar llamada'
  }
})

export const tabsMessages = defineMessages({
  monitoring: {
    id: 'views.monitoring.tabs.monitoring',
    defaultMessage: 'Monitoreo'
  },
  history: {
    id: 'views.monitoring.tabs.history',
    defaultMessage: 'Historial de llamadas'
  }
})

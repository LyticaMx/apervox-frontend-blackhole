import { defineMessages } from 'react-intl'

export const alertMessages = defineMessages({
  title: {
    id: 'views.Alerts.title',
    defaultMessage: 'Panel de alertas'
  },
  addAlert: {
    id: 'views.Alerts.addAlert',
    defaultMessage: 'Agregar alerta'
  },
  alertActivity: {
    id: 'views.Alerts.alertActivity',
    defaultMessage: 'Actividad de alertas'
  },
  callsAsociatedAlerts: {
    id: 'views.Alerts.callsAsociatedAlerts',
    defaultMessage: 'Llamadas asociadas con alertas - {alertName}'
  },
  firstSelectAlert: {
    id: 'views.Alerts.firstSelectAlert',
    defaultMessage: 'Seleccione una alerta para ver sus llamadas asociadas'
  }
})

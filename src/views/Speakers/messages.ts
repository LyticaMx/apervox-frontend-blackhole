import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  totalPins: {
    id: 'views.Speakers.totalPins',
    defaultMessage: 'Total de hablantes'
  },
  pinAlerts: {
    id: 'views.Speakers.pinAlerts',
    defaultMessage: 'Hablantes con alertas'
  },
  average: {
    id: 'views.Speakers.average',
    defaultMessage: 'P. Llamadas por hablante'
  }
})

export const histogramMessages = defineMessages({
  title: {
    id: 'views.Speakers.components.histogram.title',
    defaultMessage: 'Distribución de PINs por cantidad'
  },
  subtitle: {
    id: 'views.Speakers.components.histogram.subtitle',
    defaultMessage:
      'Da click sobre una barra para mostrar los PINs que realizaron un numero de llamadas dentro del rango'
  }
})

export const listPinsMessages = defineMessages({
  title: {
    id: 'views.Speakers.components.listPins.title',
    defaultMessage: 'Número de llamadas por PIN'
  },
  subtitle: {
    id: 'views.Speakers.components.listPins.subtitle',
    defaultMessage: 'Rango de llamadas:'
  },
  tableTotalPins: {
    id: 'views.Speakers.components.listPins.tableTotalPins',
    defaultMessage: 'Total de llamadas'
  }
})

export const heatmapMessages = defineMessages({
  speakersTitle: {
    id: 'views.Speakers.components.heatmap.speakersTitle',
    defaultMessage: 'Actividad de hablantes'
  },
  speakersSubtitle: {
    id: 'views.Speakers.components.heatmap.speakersSubtitle',
    defaultMessage:
      'Da click sobre un rectángulo para ver las llamadas realizadas en ese horario'
  },
  alertsTitle: {
    id: 'views.Speakers.components.heatmap.alertsTitle',
    defaultMessage: 'Registro de alertas en hablantes'
  },
  alertsSubtitle: {
    id: 'views.Speakers.components.heatmap.alertsSubtitle',
    defaultMessage:
      'Da click sobre un rectángulo para ver las alertas realizadas en ese horario'
  }
})

export const callsByMessages = defineMessages({
  title: {
    id: 'views.Speakers.components.callsBy.title',
    defaultMessage: 'Actividad de hablantes'
  }
})

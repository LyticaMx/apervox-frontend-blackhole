import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.acquisition.title',
    defaultMessage: 'Medios de adquisición'
  },
  subtitle: {
    id: 'views.acquisition.subtitle',
    defaultMessage: 'Líneas existentes en el sistema'
  },
  bussyLines: {
    id: 'views.acquisition.bussyLines',
    defaultMessage: 'Líneas ocupadas'
  },
  availableLines: {
    id: 'views.acquisition.availableLines',
    defaultMessage: 'Líneas disponibles'
  },
  quarantineLines: {
    id: 'views.acquisition.quarantineLines',
    defaultMessage: 'Líneas en cuarentena'
  },
  maintenanceLines: {
    id: 'views.acquisition.maintenanceLines',
    defaultMessage: 'Líneas en mantenimiento'
  },
  verificationLines: {
    id: 'views.acquisition.verificationLines',
    defaultMessage: 'Líneas de verificación'
  },
  button: {
    id: 'view.acquisition.button',
    defaultMessage: 'Agregar línea'
  }
})

export const tableMessages = defineMessages({
  date: {
    id: 'views.acquisition.table.date',
    defaultMessage: 'Fecha de registro'
  },
  releaseDate: {
    id: 'views.acquisition.table.date',
    defaultMessage: 'Fecha de liberación'
  },
  time: {
    id: 'views.acquisition.table.time',
    defaultMessage: 'Hora de evento'
  },
  company: {
    id: 'views.acquisition.table.company',
    defaultMessage: 'Compañía telefónica'
  },
  derivation: {
    id: 'views.acquisition.table.derivation',
    defaultMessage: 'Derivación'
  },
  createdBy: {
    id: 'views.acquisition.table.createdBy',
    defaultMessage: 'Registrada por'
  },
  callType: {
    id: 'views.acquisition.table.callType',
    defaultMessage: 'Tipo llamada'
  }
})

export const createMessages = defineMessages({
  title: {
    id: 'views.acquisition.create.title',
    defaultMessage: 'Agregar línea derivación'
  },
  subtitle: {
    id: 'views.acquisition.create.subtitle',
    defaultMessage:
      'Completa los siguientes campos para agregar una línea de derivación.'
  }
})

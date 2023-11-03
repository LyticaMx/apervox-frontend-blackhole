import { defineMessages } from 'react-intl'

export const tabsMessages = defineMessages({
  acquisitionMedium: {
    id: 'views.acquisition.tabs.acquisitionMedium',
    defaultMessage: 'Medios de adquisición'
  },
  verificationLine: {
    id: 'views.acquisition.tabs.verificationLine',
    defaultMessage: 'Líneas de verificación'
  }
})

export const lineHistoryMessages = defineMessages({
  title: {
    id: 'views.acquisition.history.title',
    defaultMessage: 'Historial de la línea de derivación {phone}'
  },
  status: {
    id: 'views.acquisition.history.technique.status',
    defaultMessage: 'Estatus'
  },
  active: {
    id: 'views.acquisition.history.technique.status.active',
    defaultMessage: 'Activo'
  },
  concluding: {
    id: 'views.acquisition.history.technique.status.concluding',
    defaultMessage: 'Por concluir'
  },
  concluded: {
    id: 'views.acquisition.history.technique.status.concluded',
    defaultMessage: 'Concluido'
  },
  technique: {
    id: 'views.acquisition.history.technique',
    defaultMessage: 'Técnica Asignada'
  },
  techniqueStartDate: {
    id: 'views.acquisition.history.technique.startDate',
    defaultMessage: 'Fecha de inicio de técnica'
  },
  techniqueEndDate: {
    id: 'views.acquisition.history.technique.endDate',
    defaultMessage: 'Fecha de fin de técnica'
  },
  target: {
    id: 'views.acquisition.history.target',
    defaultMessage: 'Objetivo'
  },
  targetEndDate: {
    id: 'views.acquisition.history.target.endDate',
    defaultMessage: 'Fecha de fin de objetivo'
  }
})

export const messages = defineMessages({
  title: {
    id: 'views.acquisition.title',
    defaultMessage: 'Medios de adquisición'
  },
  subtitle: {
    id: 'views.acquisition.subtitle',
    defaultMessage: 'Líneas existentes en el sistema'
  },
  assigned: {
    id: 'views.acquisition.assigned',
    defaultMessage: 'Líneas ocupadas'
  },
  available: {
    id: 'views.acquisition.available',
    defaultMessage: 'Líneas disponibles'
  },
  quarantine: {
    id: 'views.acquisition.quarantine',
    defaultMessage: 'Líneas en cuarentena'
  },
  maintenance: {
    id: 'views.acquisition.maintenance',
    defaultMessage: 'Líneas en mantenimiento'
  },
  verificationLines: {
    id: 'views.acquisition.verificationLines',
    defaultMessage: 'Líneas de verificación'
  },
  button: {
    id: 'view.acquisition.button',
    defaultMessage: 'Agregar línea'
  },
  updatedStatus: {
    id: 'view.acquisition.updatedStatus',
    defaultMessage:
      '{enabled, select, true{Habilitado} other{Deshabilitado}} correctamente'
  }
})

export const statusMessages = defineMessages({
  all: {
    id: 'views.acquisition.statusMessages.all',
    defaultMessage: 'Todas'
  },
  assigned: {
    id: 'views.acquisition.statusMessages.assigned',
    defaultMessage: 'Ocupadas'
  },
  available: {
    id: 'views.acquisition.statusMessages.available',
    defaultMessage: 'Disponibles'
  },
  quarantine: {
    id: 'views.acquisition.statusMessages.quarantine',
    defaultMessage: 'Cuarentena'
  },
  maintenance: {
    id: 'views.acquisition.statusMessages.maintenance',
    defaultMessage: 'Mantenimiento'
  }
})

export const tableMessages = defineMessages({
  date: {
    id: 'views.acquisition.table.date',
    defaultMessage: 'Fecha de registro'
  },
  releaseDate: {
    id: 'views.acquisition.table.releaseDate',
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
  },
  assigned: {
    id: 'views.acquisition.table.assigned',
    defaultMessage: 'Ocupada'
  },
  available: {
    id: 'views.acquisition.table.available',
    defaultMessage: 'Disponible'
  },
  quarantine: {
    id: 'views.acquisition.table.quarantine',
    defaultMessage: 'Cuarentena'
  },
  maintenance: {
    id: 'views.acquisition.table.maintenance',
    defaultMessage: 'Mantenimiento'
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
  },
  success: {
    id: 'views.acquisition.create.success',
    defaultMessage: 'Línea de derivación creada correctamente'
  }
})

export const editMessages = defineMessages({
  title: {
    id: 'views.acquisition.edit.title',
    defaultMessage: 'Datos de la línea'
  },
  subtitle: {
    id: 'views.acquisition.edit.subtitle',
    defaultMessage: 'Datos actuales de la línea'
  },
  success: {
    id: 'views.acquisition.edit.success',
    defaultMessage: 'Línea de derivación editada correctamente'
  }
})

export const deleteMessages = defineMessages({
  title: {
    id: 'views.acquisition.delete.title',
    defaultMessage: 'Eliminar {selectedLines, plural, one{línea} other{líneas}}'
  },
  message: {
    id: 'views.acquisition.delete.message',
    defaultMessage:
      '¿Estás seguro de querer eliminar {selectedLines, plural, one{la línea seleccionada} other {las # líneas seleccionadas}}?'
  },
  passwordConfirm: {
    id: 'views.acquisition.delete.passswordConfirm',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación de {selectedLines, plural, one{la línea} other{las # líneas}}'
  },
  success: {
    id: 'views.acquisition.delete.success',
    defaultMessage:
      '{selectedLines, plural, one{Línea eliminada} other{Líneas eliminadas}} correctamente'
  }
})

export const disableDialogMessages = defineMessages({
  overflowTitle: {
    id: 'views.acquisition.DisableDialog.overflowTitle',
    defaultMessage:
      'Habilitar / deshabilitar {selected, plural, one{línea} other {líneas}} de derivación'
  },
  verificationTitle: {
    id: 'views.acquisition.DisableDialog.verificationTitle',
    defaultMessage:
      'Habilitar / deshabilitar {selected, plural, one{línea} other {líneas}} de verificación'
  },
  message: {
    id: 'views.acquisition.DisableDialog.message',
    defaultMessage:
      '¿Quieres {status, select, false{deshabilitar} other{habilitar}} {selected, plural, one{la línea seleccionada} other {las líneas seleccionadas}}?'
  },
  success: {
    id: 'views.acquisition.DisableDialog.success',
    defaultMessage:
      '{selected, plural, one{Línea} other {Líneas}} {status, select, false{deshabilitada} other{habilitada}} correctamente'
  }
})

export const createVerificationLineMessages = defineMessages({
  title: {
    id: 'views.acquisition.CreateVerificationLines.title',
    defaultMessage: 'Agregar línea de verificación'
  },
  subtitle: {
    id: 'views.acquisition.CreateVerificationLines.subtitle',
    defaultMessage:
      'Completa los siguientes campos para agregar una línea de verificación'
  },
  success: {
    id: 'views.acquisition.CreateVerificationLines.success',
    defaultMessage: 'Línea de verificación creada correctamente'
  }
})

export const editVerificationLineMessages = defineMessages({
  title: {
    id: 'views.acquisition.EditVerificationLines.title',
    defaultMessage: 'Datos de la línea de verificación'
  },
  message: {
    id: 'views.acquisition.EditVerificationLines.message',
    defaultMessage: 'Datos actuales de la línea de verificación'
  },
  success: {
    id: 'views.acquisition.EditVerificationLines.success',
    defaultMessage: 'Línea de verificación editada correctamente'
  }
})

export const deleteVerificationLineMessages = defineMessages({
  title: {
    id: 'views.acquisition.DeleteVerificationLines.title',
    defaultMessage:
      'Eliminar {selectedLines, plural, one{línea} other{líneas}} de verificación'
  },
  message: {
    id: 'views.acquisition.DeleteVerificationLines.message',
    defaultMessage:
      '¿Estás seguro de querer eliminar {selectedLines, plural, one{la línea seleccionada} other {las # líneas seleccionadas}}?'
  },
  passwordConfirm: {
    id: 'views.acquisition.DeleteVerificationLines.passswordConfirm',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación de {selectedLines, plural, one{la línea} other{las # líneas}}'
  },
  success: {
    id: 'views.acquisition.DeleteVerificationLines.success',
    defaultMessage:
      '{selectedLines, plural, one{Línea eliminada} other{Líneas eliminadas}} correctamente'
  }
})

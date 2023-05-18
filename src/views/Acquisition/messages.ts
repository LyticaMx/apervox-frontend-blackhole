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

export const disableOverflowLineDialogMessages = defineMessages({
  title: {
    id: 'views.acquisition.DisableOverflowLineDialog.title',
    defaultMessage: 'Habilitar / deshabilitar línea de derivación'
  },
  message: {
    id: 'views.acquisition.DisableOverflowLineDialog.message',
    defaultMessage:
      '¿Quieres {status, select, false{deshabilitar} other{habilitar}} la línea seleccionada?'
  },
  success: {
    id: 'views.acquisition.DisableOverflowLineDialog.success',
    defaultMessage:
      'Línea {status, select, false{deshabilitada} other{habilitada}} correctamente'
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

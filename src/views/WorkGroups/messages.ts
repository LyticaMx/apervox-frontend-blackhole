import { defineMessages } from 'react-intl'

export const workGroupsMessages = defineMessages({
  title: {
    id: 'views.workGroups.title',
    defaultMessage: 'Grupos de trabajo'
  },
  subtitle: {
    id: 'views.workGroups.subtitle',
    defaultMessage: 'Grupos existentes en el sistema'
  },
  button: {
    id: 'views.workGroups.button',
    defaultMessage: 'Agregar grupo'
  }
})

export const workGroupsCreateDrawerMessages = defineMessages({
  title: {
    id: 'views.workGroups.createDrawer.title',
    defaultMessage: 'Agregar grupo de trabajo'
  },
  subtitle: {
    id: 'views.workGroups.createDrawer.message',
    defaultMessage:
      'Completa los siguientes campos para crear un nuevo grupo de trabajo.'
  }
})

export const workGroupsEditDrawerMessages = defineMessages({
  title: {
    id: 'views.workGroups.editDrawer.title',
    defaultMessage: 'Datos de grupo de trabajo'
  },
  subtitle: {
    id: 'views.workGroups.editDrawer.message',
    defaultMessage: 'Datos actuales del grupo de trabajo seleccionado.'
  }
})

export const workGroupsDisableDialogMessages = defineMessages({
  title: {
    id: 'views.workGroups.disableDialog.title',
    defaultMessage: 'Habilitar / deshabilitar grupo'
  },
  message: {
    id: 'views.workGroups.disableDialog.message',
    defaultMessage:
      'El grupo seleccionado se encuentra {status, select, true {habilitado} other {deshabilitado}}, ¿quieres {status, select, true {deshabilitarlo} other {habilitarlo}}?'
  }
})

export const workGroupsDeleteDialogMessages = defineMessages({
  title: {
    id: 'views.workGroups.deleteDialog.title',
    defaultMessage: 'Eliminar grupo de trabajo'
  },
  message: {
    id: 'views.workGroups.deleteDialog.message',
    defaultMessage:
      '¿Estas seguro de querer eliminar {selectedGroups, plural, one {el grupo de trabajo seleccionado} other {los # grupos de trabajo seleccionados}}?'
  },
  passwordConfirmMessage: {
    id: 'views.workGroups.deleteDialog.passwordConfirmMessage',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación {selectedGroups, plural, one {del grupo de trabajo seleccionado} other {de los # grupos de trabajo seleccionados}}'
  }
})

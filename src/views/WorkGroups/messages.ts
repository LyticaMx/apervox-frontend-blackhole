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
  },
  assignedSectionTitle: {
    id: 'views.workGroups.assignedSectionTitle',
    defaultMessage: 'Datos de grupo de trabajo - {groupName}'
  },
  assignedUsersSubtitle: {
    id: 'views.workGroups.assignedUsersSubtitle',
    defaultMessage: 'Usuarios asignados en el grupo'
  },
  assignedTechniquesSubtitle: {
    id: 'views.workGroups.assignedTechniquesSubtitle',
    defaultMessage: 'Técnicas asignadas al grupo'
  },
  editGroup: {
    id: 'views.workGroups.editGr',
    defaultMessage: 'Editar grupo'
  }
})

export const workGroupListMessages = defineMessages({
  updatedGroupStatus: {
    id: 'views.WorkGroups.WorkGroupList.updatedGroupStatus',
    defaultMessage:
      'Grupo {enabled, select, true{habilitado} other{deshabilitado}} correctamente'
  },
  deletedWorkGroup: {
    id: 'views.WorkGroups.WorkGroupList.deletedWorkGroup',
    defaultMessage: 'Grupo eliminado correctamente'
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
  },
  success: {
    id: 'views.workGroups.createDrawer.success',
    defaultMessage: 'Grupo creado correctamente'
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
  },
  success: {
    id: 'views.workGroups.editDrawer.success',
    defaultMessage: 'Grupo actualizado correctamente'
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
  },
  successDelete: {
    id: 'views.workGroups.deleteDialog.successDelete',
    defaultMessage:
      '{groups, plural, one{Grupo eliminado} other{Grupos eliminados}} correctamente.'
  }
})

export const workGroupsHistoryDrawerMessages = defineMessages({
  title: {
    id: 'views.workGroups.historyDrawer.title',
    defaultMessage: 'Auditoría'
  },
  subtitle: {
    id: 'views.workGroups.historyDrawer.subtitle',
    defaultMessage: 'Historial de movimientos auditados'
  },
  message: {
    id: 'views.workGroups.historyDrawer.message',
    defaultMessage:
      'Puedes visualizar los movimientos más recientes que han sido registrados en el grupo de trabajo.'
  }
})

export const workGroupsFormMessages = defineMessages({
  usersMessage: {
    id: 'views.workGroups.workGroupsForm.usersMessage',
    defaultMessage:
      'Selecciona los usuarios que quieras asignar a este grupo de trabajo.'
  },
  techniquesMessage: {
    id: 'views.workGroups.workGroupsForm.techniquesMessage',
    defaultMessage: 'Selecciona las técnicas que quieras asignar a este grupo.'
  },
  selectUsersPlaceholder: {
    id: 'views.workGroups.workGroupsForm.selectUsersPlaceholder',
    defaultMessage: 'Selecciona los usuarios'
  }
})

export const workGroupsUsersListMessages = defineMessages({
  deletedUsersSuccess: {
    id: 'views.workGroups.workGroupsForm.deletedUsersSuccess',
    defaultMessage:
      '{total, select, one{Usuario eliminado} other{Usuarios eliminados}} correctamente'
  }
})

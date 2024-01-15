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
  },
  hasUsers: {
    id: 'views.WorkGroups.WorkGroupList.hasUsers',
    defaultMessage: 'Tiene usuarios'
  },
  hasNoUsers: {
    id: 'views.WorkGroups.WorkGroupList.hasNoUsers',
    defaultMessage: 'No tiene usuarios'
  },
  hasTechniques: {
    id: 'views.WorkGroups.WorkGroupList.hasTechniques',
    defaultMessage: 'Tiene técnicas'
  },
  hasNoTechniques: {
    id: 'views.WorkGroups.WorkGroupList.hasNoTechniques',
    defaultMessage: 'No tiene técnicas'
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
    defaultMessage:
      'Habilitar / deshabilitar {total, plural, one{grupo} other{{total} grupos}}'
  },
  message: {
    id: 'views.workGroups.disableDialog.message',
    defaultMessage:
      '¿Quieres {status, select, false {deshabilitar} other {habilitar}} {total, plural, one{el grupo seleccionado} other{los {total} grupos seleccionados}}?'
  },
  success: {
    id: 'views.workGroups.disableDialog.success',
    defaultMessage:
      '{total, plural, one{Grupo {status,select,false{deshabilitado} other{habilitado}}} other {Grupos {status,select,false{deshabilitados}other{habilitados}}}} correctamente'
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
  },
  search: {
    id: 'views.workGroups.historyDrawer.search',
    defaultMessage: 'Busqueda'
  },
  created: {
    id: 'views.workGroups.historyDrawer.created',
    defaultMessage: 'Creación'
  },
  updated: {
    id: 'views.workGroups.historyDrawer.updated',
    defaultMessage: 'Actualización'
  },
  deleted: {
    id: 'views.workGroups.historyDrawer.deleted',
    defaultMessage: 'Eliminación'
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
  },
  selectTechniquesPlaceholder: {
    id: 'views.workGroups.workGroupsForm.selectTechniquesPlaceholder',
    defaultMessage: 'Selecciona las técnicas'
  }
})

export const workGroupsUsersListMessages = defineMessages({
  unlinkedUsersSuccess: {
    id: 'views.workGroups.workGroupsForm.unlinkedUsersSuccess',
    defaultMessage:
      '{total, plural, one{Usuario desvinculado} other{Usuarios desvinculados}} correctamente'
  },
  unlinkedTechniquesSuccess: {
    id: 'views.workGroups.workGroupsForm.unlinkedTechniquesSuccess',
    defaultMessage:
      '{total, plural, one{Técnica desvinculada} other{Técnicas desvinculadas}} correctamente'
  }
})

import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.Audit.title',
    defaultMessage: 'Auditoría'
  },
  auditedModule: {
    id: 'views.Audit.auditedModule',
    defaultMessage: 'Módulo auditado'
  },
  loginFailedAttemps: {
    id: 'views.Audit.loginFailedAttemps',
    defaultMessage: 'Intentos fallidos de inicio de sesión {attemps}'
  },
  blockedUsers: {
    id: 'views.Audit.blockedUsers',
    defaultMessage: 'Usuarios bloqueados en el sistema {users}'
  },
  /* Revisar que tan comunes son estos nombres */
  rolesAndPermissions: {
    id: 'views.Audit.rolesAndPermissions',
    defaultMessage: 'Roles y permisos'
  },
  usersControl: {
    id: 'views.Audit.usersControl',
    defaultMessage: 'Control de usuarios'
  },
  workgroups: {
    id: 'views.Audit.workgroups',
    defaultMessage: 'Grupos de trabajo'
  },
  acquisitionMedium: {
    id: 'views.Audit.acquisitionMedium',
    defaultMessage: 'Medios de adquisición'
  },
  created: {
    id: 'views.Audit.UserDrawer.created',
    defaultMessage: 'Creado: {date}'
  }
})

export const auditDrawerMessages = defineMessages({
  auditedMovement: {
    id: 'views.Audit.AuditDrawer.auditedMovement',
    defaultMessage: 'Movimiento auditado - detalle'
  }
})

export const userDrawerMessages = defineMessages({
  userData: {
    id: 'views.Audit.UserDrawer.userData',
    defaultMessage: 'Datos del usuario'
  },
  userHistory: {
    id: 'views.Audit.UserDrawer.userHistory',
    defaultMessage: 'Historial de movimientos del usuario'
  }
})

export const groupDrawerMessages = defineMessages({
  groupData: {
    id: 'views.Audit.GroupDrawer.groupData',
    defaultMessage: 'Datos del grupo'
  },
  selectedGroupData: {
    id: 'views.Audit.GroupDrawer.selectedGroupData',
    defaultMessage: 'Datos del grupo de trabajo seleccionado'
  },
  workgroupName: {
    id: 'views.Audit.GroupDrawer.workgroupName',
    defaultMessage: 'Nombre del grupo de trabajo'
  },
  groupHistory: {
    id: 'views.Audit.GroupDrawer.groupHistory',
    defaultMessage: 'Historial de movimientos del grupo'
  }
})

export const lineDrawerMessages = defineMessages({
  lineData: {
    id: 'views.Audit.LineDrawer.lineData',
    defaultMessage: 'Datos de línea'
  },
  selectedLineData: {
    id: 'views.Audit.LineDrawer.selectedLineData',
    defaultMessage: 'Datos actuales de la línea seleccionada'
  },
  lineHistory: {
    id: 'views.Audit.LineDrawer.lineHistory',
    defaultMessage: 'Historial de movimientos de la línea'
  }
})

export const tiDrawerMessages = defineMessages({
  tiData: {
    id: 'views.Audit.TiDrawer.tiData',
    defaultMessage: 'Datos de la técnica'
  },
  selectedTiData: {
    id: 'views.Audit.TiDrawer.selectedTiData',
    defaultMessage: 'Datos actuales de la técnica seleccionada'
  },
  linesInFollow: {
    id: 'views.Audit.TiDrawer.linesInFollow',
    defaultMessage: 'Datos de las líneas en seguimiento'
  },
  lineNumber: {
    id: 'views.Audit.TiDrawer.lineNumber',
    defaultMessage: 'Número de línea'
  },
  selectedTiStatus: {
    id: 'views.Audit.TiDrawer.selectedTiStatus',
    defaultMessage: 'Estado de la técnica seleccionada'
  },
  selectedTiHistory: {
    id: 'views.Audit.TiDrawer.selectedTiHistory',
    defaultMessage: 'Historial de movimientos de la técnica'
  }
})

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
    defaultMessage: 'Intentos fallidos de inicio de sesión'
  },
  blockedUsers: {
    id: 'views.Audit.blockedUsers',
    defaultMessage: 'Usuarios bloqueados en el sistema'
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
  },
  techniques: { id: 'views.Audit.techniques', defaultMessage: 'Técnicas' },
  monitor: { id: 'views.Audit.monitor', defaultMessage: 'Monitor' },
  settings: { id: 'views.Audit.settings', defaultMessage: 'Configuración' },
  metadata: { id: 'views.Audit.metadata', defaultMessage: 'Info. Objetivos' }
})

export const auditableModules = defineMessages({
  me: { id: 'views.Audit.AuditableModules.me', defaultMessage: 'Mi cuenta' },
  auth: {
    id: 'views.Audit.AuditableModules.auth',
    defaultMessage: 'Autenticación'
  },
  techniques: {
    id: 'views.Audit.AuditableModules.techniques',
    defaultMessage: 'Técnicas'
  },
  users: {
    id: 'views.Audit.AuditableModules.users',
    defaultMessage: 'Usuarios'
  },
  adquisition: {
    id: 'views.Audit.AuditableModules.adquisition',
    defaultMessage: 'Medios de adquisición'
  },
  transcription: {
    id: 'views.Audit.AuditableModules.transcription',
    defaultMessage: 'Transcripción'
  },
  overflow_lines: {
    id: 'views.Audit.AuditableModules.overflow_lines',
    defaultMessage: 'Medios de adquisición'
  },
  verification_lines: {
    id: 'views.Audit.AuditableModules.verification_lines',
    defaultMessage: 'Líneas de verificación'
  },
  targets: {
    id: 'views.Audit.AuditableModules.targets',
    defaultMessage: 'Objetivos'
  },
  settings: {
    id: 'views.Audit.AuditableModules.settings',
    defaultMessage: 'Configuración'
  },
  acquisition_mediums: {
    id: 'views.Audit.AuditableModules.acquisition_mediums',
    defaultMessage: 'Medios'
  },
  devices: {
    id: 'views.Audit.AuditableModules.devices',
    defaultMessage: 'Equipos'
  },
  carriers: {
    id: 'views.Audit.AuditableModules.carriers',
    defaultMessage: 'Compañías telefónicas'
  },
  labels: {
    id: 'views.Audit.AuditableModules.labels',
    defaultMessage: 'Etiquetas'
  },
  letterheads: {
    id: 'views.Audit.AuditableModules.letterheads',
    defaultMessage: 'Membretes'
  },
  roles: {
    id: 'views.Audit.AuditableModules.roles',
    defaultMessage: 'Roles'
  },
  groups: {
    id: 'views.Audit.AuditableModules.workgroups',
    defaultMessage: 'Grupos'
  },
  synopsis: {
    id: 'views.Audit.AuditableModules.synopsis',
    defaultMessage: 'Sinopsis'
  },
  region: {
    id: 'views.Audit.AuditableModules.region',
    defaultMessage: 'Regiones'
  },
  call_evidences: {
    id: 'views.Audit.AuditableModules.call_evidences',
    defaultMessage: 'Evidencias'
  },
  monitor: {
    id: 'views.Audit.AuditableModules.monitor',
    defaultMessage: 'Monitor'
  }
})

export const auditableActions = defineMessages({
  logged: {
    id: 'views.Audit.AuditableActions.logged',
    defaultMessage: 'Inició sesión'
  },
  logout: {
    id: 'views.Audit.AuditableActions.logout',
    defaultMessage: 'Cerró sesión'
  },
  logging_attemp: {
    id: 'views.Audit.AuditableActions.logging_attemp',
    defaultMessage: 'Intento de inicio de sesión'
  },
  get_in: {
    id: 'views.Audit.AuditableActions.get_in',
    defaultMessage: 'Ingreso al módulo'
  },
  view: {
    id: 'views.Audit.AuditableActions.view',
    defaultMessage: 'Visualización'
  },
  search: {
    id: 'views.Audit.AuditableActions.search',
    defaultMessage: 'Busqueda'
  },
  created: {
    id: 'views.Audit.AuditableActions.created',
    defaultMessage: 'Creación'
  },
  updated: {
    id: 'views.Audit.AuditableActions.updated',
    defaultMessage: 'Actualización'
  },
  deleted: {
    id: 'views.Audit.AuditableActions.deleted',
    defaultMessage: 'Eliminación'
  },
  started_automatic_transcription: {
    id: 'views.Audit.AuditableActions.started_automatic_transcription',
    defaultMessage: 'Comenzó una transcripción automática'
  },
  stream: {
    id: 'views.Audit.AuditableActions.stream',
    defaultMessage: 'Reproducción de audio'
  },
  exported: {
    id: 'views.Audit.AuditableActions.exported',
    defaultMessage: 'Exporte'
  }
})

export const auditableActionOf = defineMessages({
  me: {
    id: 'views.Audit.AuditableModules.of.me',
    defaultMessage: 'de mi cuenta'
  },
  techniques: {
    id: 'views.Audit.AuditableModules.of.techniques',
    defaultMessage: 'de técnica'
  },
  users: {
    id: 'views.Audit.AuditableModules.of.users',
    defaultMessage: 'de usuario'
  },
  adquisition: {
    id: 'views.Audit.AuditableModules.of.adquisition',
    defaultMessage: 'de medio de adquisición'
  },
  overflow_lines: {
    id: 'views.Audit.AuditableModules.of.overflow_lines',
    defaultMessage: 'de medio de adquisición'
  },
  verification_lines: {
    id: 'views.Audit.AuditableModules.of.verification_lines',
    defaultMessage: 'de línea de verificación'
  },
  targets: {
    id: 'views.Audit.AuditableModules.of.targets',
    defaultMessage: 'de objetivo'
  },
  settings: {
    id: 'views.Audit.AuditableModules.of.settings',
    defaultMessage: 'de configuración'
  },
  acquisition_mediums: {
    id: 'views.Audit.AuditableModules.of.acquisition_mediums',
    defaultMessage: 'de medio'
  },
  devices: {
    id: 'views.Audit.AuditableModules.of.devices',
    defaultMessage: 'de equipo'
  },
  carriers: {
    id: 'views.Audit.AuditableModules.of.carriers',
    defaultMessage: 'de compañía telefónica'
  },
  labels: {
    id: 'views.Audit.AuditableModules.of.labels',
    defaultMessage: 'de etiqueta'
  },
  letterheads: {
    id: 'views.Audit.AuditableModules.of.letterheads',
    defaultMessage: 'de membrete'
  },
  roles: {
    id: 'views.Audit.AuditableModules.of.roles',
    defaultMessage: 'de rol'
  },
  groups: {
    id: 'views.Audit.AuditableModules.of.workgroups',
    defaultMessage: 'de grupo'
  },
  synopsis: {
    id: 'views.Audit.AuditableModules.of.synopsis',
    defaultMessage: 'de sinopsis'
  },
  region: {
    id: 'views.Audit.AuditableModules.of.region',
    defaultMessage: 'de regiones'
  },
  call_evidences: {
    id: 'views.Audit.AuditableModules.of.call_evidences',
    defaultMessage: 'de evidencia'
  },
  monitor: {
    id: 'views.Audit.AuditableModules.of.monitor',
    defaultMessage: 'de monitor'
  },
  transcription: {
    id: 'views.Audit.AuditableModules.of.transcription',
    defaultMessage: 'de transcripción'
  }
})

export const auditableActionTableOf = defineMessages({
  techniques: {
    id: 'views.Audit.AuditableModules.of.table.techniques',
    defaultMessage: 'de tabla de técnicas'
  },
  users: {
    id: 'views.Audit.AuditableModules.of.table.users',
    defaultMessage: 'de tabla de usuarios'
  },
  adquisition: {
    id: 'views.Audit.AuditableModules.of.table.adquisition',
    defaultMessage: 'de tabla de medios de adquisición'
  },
  overflow_lines: {
    id: 'views.Audit.AuditableModules.of.table.overflow_lines',
    defaultMessage: 'de tabla de medios de adquisición'
  },
  verification_lines: {
    id: 'views.Audit.AuditableModules.of.table.verification_lines',
    defaultMessage: 'de tabla de líneas de verificación'
  },
  targets: {
    id: 'views.Audit.AuditableModules.of.table.targets',
    defaultMessage: 'de tabla de objetivos'
  },
  settings: {
    id: 'views.Audit.AuditableModules.of.table.settings',
    defaultMessage: 'de tabla de configuración'
  },
  acquisition_mediums: {
    id: 'views.Audit.AuditableModules.of.table.acquisition_mediums',
    defaultMessage: 'de tabla de medios'
  },
  devices: {
    id: 'views.Audit.AuditableModules.of.table.devices',
    defaultMessage: 'de tabla de equipos'
  },
  carriers: {
    id: 'views.Audit.AuditableModules.of.table.carriers',
    defaultMessage: 'de tabla de compañías telefónicas'
  },
  labels: {
    id: 'views.Audit.AuditableModules.of.table.labels',
    defaultMessage: 'de tabla de etiquetas'
  },
  letterheads: {
    id: 'views.Audit.AuditableModules.of.table.letterheads',
    defaultMessage: 'de tabla de membretes'
  },
  roles: {
    id: 'views.Audit.AuditableModules.of.table.roles',
    defaultMessage: 'de tabla de roles'
  },
  groups: {
    id: 'views.Audit.AuditableModules.of.table.workgroups',
    defaultMessage: 'de tabla de grupos'
  },
  call_evidences: {
    id: 'views.Audit.AuditableModules.of.table.call_evidences',
    defaultMessage: 'de tabla de evidencia'
  },
  monitor: {
    id: 'views.Audit.AuditableModules.of.table.monitor',
    defaultMessage: 'de tabla de monitor'
  },
  transcription: {
    id: 'views.Audit.AuditableModules.of.transcription',
    defaultMessage: 'de transcripción'
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

export const blockedUsersMessages = defineMessages({
  blocked: {
    id: 'views.Audit.BlockedUsers.blocked',
    defaultMessage: 'Usuario bloqueado'
  }
})

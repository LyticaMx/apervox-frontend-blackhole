import { defineMessages } from 'react-intl'

export const rolesMessages = defineMessages({
  title: {
    id: 'views.roles.title',
    defaultMessage: 'Roles de usuario'
  },
  subtitle: {
    id: 'views.roles.subtitle',
    defaultMessage: 'Roles existentes en el sistema'
  },
  button: {
    id: 'views.roles.button',
    defaultMessage: 'Crear rol de usario'
  },
  deleteSuccess: {
    id: 'views.roles.deleteSuccess',
    defaultMessage:
      'El rol de usuario ha sido eliminado del sistema correctamente.'
  }
})

export const rolesCardMessages = defineMessages({
  createdAt: {
    id: 'views.roles.card.createdAt',
    defaultMessage: 'Creación'
  },
  createdBy: {
    id: 'views.roles.card.createdBy',
    defaultMessage: 'Creado por'
  },
  totalUsers: {
    id: 'views.roles.card.totalUsers',
    defaultMessage: 'usuarios asignados'
  }
})

export const rolesDeleteMessages = defineMessages({
  title: {
    id: 'views.roles.delete.title',
    defaultMessage: 'Eliminar rol de usuario'
  },
  message: {
    id: 'views.roles.delete.message',
    defaultMessage:
      '¿Estás seguro de querer eliminar el rol de usuario seleccionado?'
  },
  confirm: {
    id: 'views.roles.delete.confirm',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación del rol de usuario seleccionado.'
  }
})

export const rolesDisableMessages = defineMessages({
  title: {
    id: 'views.roles.disable.title',
    defaultMessage:
      '{enabled, select, true{Deshabilitar} other {Habilitar}} rol de usuario'
  },
  message: {
    id: 'views.roles.disable.message',
    defaultMessage:
      'El rol de usuario seleccionado se encuentra {enabled, select, true{habilitado} other{deshabilitado}}.'
  },
  success: {
    id: 'views.roles.disable.success',
    defaultMessage:
      'Rol de usuario {enabled, select, true{habilitado} other{deshabilitado}} correctamente'
  }
})

export const rolesPermissionsMessages = defineMessages({
  general: {
    id: 'views.roles.permissions.general',
    defaultMessage: 'Permisos generales'
  },
  create: {
    id: 'views.roles.permissions.create',
    defaultMessage: 'Creación'
  },
  update: {
    id: 'views.roles.permissions.update',
    defaultMessage: 'Edición'
  },
  delete: {
    id: 'views.roles.permissions.delete',
    defaultMessage: 'Eliminación'
  },
  export: {
    id: 'views.roles.permissions.export',
    defaultMessage: 'Exportación'
  }
})

export const rolesDrawerMessages = defineMessages({
  title: {
    id: 'views.roles.drawer.title',
    defaultMessage: 'Crear rol de usuario'
  },
  message: {
    id: 'views.roles.drawer.message',
    defaultMessage:
      'Completa los siguientes campos y asigna los permisos que tendrá el un nuevo rol de usuario.'
  },
  titleUpdate: {
    id: 'views.roles.drawer.title.update',
    defaultMessage: 'Datos del rol de usuario'
  },
  messageUpdate: {
    id: 'views.roles.drawer.message.update',
    defaultMessage:
      'Datos actualizados pertenecientes al rol de usuario seleccionado.'
  },
  name: {
    id: 'views.roles.drawer.name',
    defaultMessage: 'Nombre del perfil o rol de usuario'
  },
  modules: {
    id: 'views.roles.drawer.modules',
    defaultMessage: 'Visualización de módulos y permisos'
  },
  usersMessage: {
    id: 'views.roles.drawer.usersMessage',
    defaultMessage: 'Selecciona usuarios para asignarlos a este perfil.'
  },
  usersPlaceholder: {
    id: 'views.roles.drawer.usersPlaceholder',
    defaultMessage: 'Seleccionar usuarios'
  }
})

export const scopeNamesMessages = defineMessages({
  me: {
    id: 'views.roles.scopes.me',
    defaultMessage: 'Mi Cuenta'
  },
  users: {
    id: 'views.roles.scopes.users',
    defaultMessage: 'Control de usuarios'
  },
  sessions: {
    id: 'views.roles.scopes.sessions',
    defaultMessage: 'Sesiones'
  },
  roles: {
    id: 'views.roles.scopes.roles',
    defaultMessage: 'Roles de usuarios'
  },
  groups: {
    id: 'views.roles.scopes.groups',
    defaultMessage: 'Grupos de trabajo'
  },
  techniques: {
    id: 'views.roles.scopes.techniques',
    defaultMessage: 'Técnicas'
  },
  carriers: {
    id: 'views.roles.scopes.carriers',
    defaultMessage: 'Compañias telefónicas'
  },
  acquisition_mediums: {
    id: 'views.roles.scopes.acquisitionMediums',
    defaultMessage: 'Medios de adquisición'
  },
  devices: {
    id: 'views.roles.scopes.devices',
    defaultMessage: 'Equipos'
  },
  settings: {
    id: 'views.roles.scopes.settings',
    defaultMessage: 'Configuración'
  },
  labels: {
    id: 'views.roles.scopes.labels',
    defaultMessage: 'Rótulos'
  },
  letterheads: {
    id: 'views.roles.scopes.letterheads',
    defaultMessage: 'Membretes'
  },
  overflow_lines: {
    id: 'views.roles.scopes.overflowLines',
    defaultMessage: 'Líneas'
  },
  verification_lines: {
    id: 'views.roles.scopes.verificationLines',
    defaultMessage: 'Líneas de verificación'
  },
  targets: {
    id: 'views.roles.scopes.targets',
    defaultMessage: 'Objetivos'
  },
  target_metadatas: {
    id: 'views.roles.scopes.target_metadatas',
    defaultMessage: 'Metadatos de los objetivos'
  }
})

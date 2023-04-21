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
    defaultMessage: 'Crear role de usario'
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
      '¿Estas seguro de querer eliminar el rol de usuario seleccionado?'
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
  }
})

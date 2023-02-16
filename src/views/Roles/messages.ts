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
      '¿Estas seguro de querer eliminar el rol de usuario seleccionado?'
  }
})

export const rolesCreateMessages = defineMessages({
  title: {
    id: 'views.roles.create.title',
    defaultMessage: 'Crear rol de usuario'
  },
  message: {
    id: 'views.roles.create.message',
    defaultMessage:
      'Completa los siguientes campos y asigna los permisos que tendrá el un nuevo rol de usuario.'
  },
  name: {
    id: 'views.roles.create.name',
    defaultMessage: 'Nombre del perfil o rol de usuario'
  },
  modules: {
    id: 'views.roles.create.modules',
    defaultMessage: 'Visualización de módulos y permisos'
  },
  usersMessage: {
    id: 'views.roles.create.usersMessage',
    defaultMessage: 'Selecciona usuarios para asignarlos a este perfil.'
  }
})

import { defineMessages } from 'react-intl'

export const usersMessages = defineMessages({
  totalUsers: {
    id: 'views.Admin.Users.totalUsers',
    defaultMessage: 'Total de usuarios'
  },
  usersRequests: {
    id: 'views.Admin.Users.usersRequests',
    defaultMessage: 'Solicitudes pendientes'
  }
})

export const listUsersMessages = defineMessages({
  tableDateRequest: {
    id: 'views.Admin.Users.components.users.tableDateRequest',
    defaultMessage: 'Fecha de solicitud'
  },
  tableTimeRequest: {
    id: 'views.Admin.Users.components.users.tableTimeRequest',
    defaultMessage: 'Hora de solicitud'
  }
})

export const usersRequestsMessages = defineMessages({
  title: {
    id: 'views.Admin.Users.components.requests.title',
    defaultMessage: 'Nuevas solicitudes de acceso'
  },
  tableDateRequest: {
    id: 'views.Admin.Users.components.requests.tableDateRequest',
    defaultMessage: 'Fecha de solicitud'
  },
  tableTimeRequest: {
    id: 'views.Admin.Users.components.requests.tableTimeRequest',
    defaultMessage: 'Hora de solicitud'
  }
})

export const updateMessages = defineMessages({
  title: {
    id: 'views.Admin.Users.components.updateDialog.title',
    defaultMessage: 'Editar usuario'
  },
  subtitle: {
    id: 'views.Admin.Users.components.updateDialog.subtitle',
    defaultMessage:
      'Todas las modificaciones realizadas en este apartado quedarán registradas.'
  }
})

export const requestMessages = defineMessages({
  title: {
    id: 'views.Admin.Dependency.components.requestDialog.title',
    defaultMessage: 'Solicitud de acceso'
  },
  subtitle: {
    id: 'views.Admin.Dependency.components.requestDialog.subtitle',
    defaultMessage: 'Se ha recibido una solicitud de acceso por parte de:'
  },
  subtitleAssignment: {
    id: 'views.Admin.Dependency.components.requestDialog.subtitleAssignment',
    defaultMessage: 'Asigna una dependencia y un rol al nuevo usuario'
  }
})

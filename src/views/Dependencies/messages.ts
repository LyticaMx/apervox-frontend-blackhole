import { defineMessages } from 'react-intl'

export const listDependenciesMessages = defineMessages({
  title: {
    id: 'views.Admin.Dependencies.components.dependencies.title',
    defaultMessage: 'Lista de dependencias'
  },
  addDepndency: {
    id: 'views.Admin.Dependencies.components.dependencies.addDependency',
    defaultMessage: 'Agregar dependencia'
  },
  tableName: {
    id: 'views.Admin.Dependencies.components.dependencies.tableName',
    defaultMessage: 'Nombre'
  },
  tableTotalUsers: {
    id: 'views.Admin.Dependencies.components.dependencies.tableTotalUsers',
    defaultMessage: 'Total de usuarios'
  },
  tableCreatedAt: {
    id: 'views.Admin.Dependencies.components.dependencies.tableCreatedAt',
    defaultMessage: 'Creación'
  }
})

export const dependencyUsersMessages = defineMessages({
  linkUser: {
    id: 'views.Admin.Dependencies.components.dependencyUsers.linkUser',
    defaultMessage: 'Vincular usuario'
  },
  tableDate: {
    id: 'views.Admin.Dependencies.components.dependencyUsers.tableDate',
    defaultMessage: 'Fecha de vinculación'
  },
  tableTime: {
    id: 'views.Admin.Dependencies.components.dependencyUsers.tableTime',
    defaultMessage: 'Hora de vinculación'
  },
  tableName: {
    id: 'views.Admin.Dependencies.components.dependencyUsers.tableName',
    defaultMessage: 'Nombre'
  },
  tableEmail: {
    id: 'views.Admin.Dependencies.components.dependencyUsers.tableEmail',
    defaultMessage: 'Correo electrónico'
  },
  tableEject: {
    id: 'views.Admin.Dependencies.components.dependencyUsers.tableEject',
    defaultMessage: 'Expulsar'
  }
})

export const storeMessages = defineMessages({
  title: {
    id: 'views.Admin.Dependency.components.storeDialog.title',
    defaultMessage: 'Crear dependencia'
  },
  subtitle: {
    id: 'views.Admin.Dependency.components.storeDialog.subtitle',
    defaultMessage:
      'La creación de nuevas dependencias quedarán vinculadas a tu usuario'
  },
  linkUsers: {
    id: 'views.Admin.Dependency.components.storeDialog.linkUsers',
    defaultMessage: 'Vincular usuarios'
  }
})

export const updateMessages = defineMessages({
  title: {
    id: 'views.Admin.Dependency.components.updateDialog.title',
    defaultMessage: 'Editar dependencia'
  },
  subtitle: {
    id: 'views.Admin.Dependency.components.updateDialog.subtitle',
    defaultMessage: 'La edición de información quedará vinculada a tu usuario'
  },
  linkUsers: {
    id: 'views.Admin.Dependency.components.updateDialog.linkUsers',
    defaultMessage: 'Vincular usuarios'
  }
})

export const linkMessages = defineMessages({
  subtitle: {
    id: 'views.Admin.Dependency.components.linkUser.subtitle',
    defaultMessage: 'Añade un nuevo usuario a esta dependencia'
  },
  linkUsers: {
    id: 'views.Admin.Dependency.components.linkUser.linkUsers',
    defaultMessage: 'Vincular usuarios'
  }
})

export const deleteMessages = defineMessages({
  title: {
    id: 'views.Admin.Dependency.components.deleteDialog.title',
    defaultMessage: '¿Está seguro de realizar esta acción?'
  }
})

export const ejectUserMessages = defineMessages({
  title: {
    id: 'views.Admin.Dependency.components.ejectUserDialog.title',
    defaultMessage: 'Expulsar a {user} de {dependency}'
  }
})

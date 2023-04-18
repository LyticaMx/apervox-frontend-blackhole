import { defineMessages } from 'react-intl'

export const userAccountMessages = defineMessages({
  title: {
    id: 'views.Auth.UserAccount.title',
    defaultMessage: 'Mi Cuenta'
  }
})

export const userInfoMessages = defineMessages({
  startDate: {
    id: 'views.Auth.UserAccount.UserInfo.startDate',
    defaultMessage: 'Fecha de inicio'
  },
  role: {
    id: 'views.Auth.UserAccount.UserInfo.role',
    defaultMessage: 'Rol de usuario'
  },
  generalData: {
    id: 'views.Auth.UserAccount.UserInfo.generalData',
    defaultMessage: 'Datos generales'
  },
  name: {
    id: 'views.Auth.UserAccount.UserInfo.name',
    defaultMessage: 'Nombre (s)'
  },
  lastname: {
    id: 'views.Auth.UserAccount.UserInfo.lastname',
    defaultMessage: 'Apellidos'
  },
  username: {
    id: 'views.Auth.UserAccount.UserInfo.username',
    defaultMessage: 'Nombre de usuario'
  },
  email: {
    id: 'views.Auth.UserAccount.UserInfo.email',
    defaultMessage: 'Correo electrónico '
  },
  extension: {
    id: 'views.Auth.UserAccount.UserInfo.extension',
    defaultMessage: 'Extensión'
  },
  position: {
    id: 'views.Auth.UserAccount.UserInfo.position',
    defaultMessage: 'Puesto'
  },
  groups: {
    id: 'views.Auth.UserAccount.UserInfo.groups',
    defaultMessage: 'Grupos'
  },
  submitButton: {
    id: 'views.Auth.UserAccount.UserInfo.submitButton',
    defaultMessage: 'Actualizar datos'
  },
  success: {
    id: 'views.Auth.UserAccount.UserInfo.success',
    defaultMessage: 'Datos actualizados correctamente'
  }
})

export const changePasswordMessages = defineMessages({
  title: {
    id: 'views.Auth.UserAccount.ChangePassword.title',
    defaultMessage: 'Cambiar contraseña'
  },
  subtitle: {
    id: 'views.Auth.UserAccount.ChangePassword.subtitle',
    defaultMessage:
      'Si necesitas cambiar tu contraseña puedes hacerlo desde esta sección.'
  },
  currentPassword: {
    id: 'views.Auth.UserAccount.ChangePassword.currentPassword',
    defaultMessage: 'Contraseña actual'
  },
  newPassword: {
    id: 'views.Auth.UserAccount.ChangePassword.newPassword',
    defaultMessage: 'Nueva contraseña'
  },
  confirmPassword: {
    id: 'views.Auth.UserAccount.ChangePassword.confirmPassword',
    defaultMessage: 'Confirmar contraseña'
  },
  passwordPlaceholder: {
    id: 'views.Auth.UserAccount.ChangePassword.passwordPlaceholder',
    defaultMessage: 'Ej. Gy43@g32VFINmfGT1'
  },
  submitButton: {
    id: 'views.Auth.UserAccount.ChangePassword.submitButton',
    defaultMessage: 'Actualizar contraseña'
  },
  success: {
    id: 'views.Auth.UserAccount.ChangePassword.success',
    defaultMessage: 'Contraseña actualizada correctamente'
  }
})

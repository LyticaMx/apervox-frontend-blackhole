import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  firstTime: {
    id: 'views.Auth.RestorePassword.firstTime',
    defaultMessage:
      'Parece que es la primera vez que inicias sesión en Black Hole, por seguridad debes cambiar la contraseña temporal asignada.'
  },

  oldPassword: {
    id: 'views.Auth.RestorePassword.oldPassword',
    defaultMessage: 'Contraseña actual'
  },
  newPassword: {
    id: 'views.Auth.RestorePassword.newPassword',
    defaultMessage: 'Nueva contraseña'
  },
  confirmPassword: {
    id: 'views.Auth.RestorePassword.confirmPassword',
    defaultMessage: 'Confirmar nueva contraseña'
  },
  passwordPlaceholder: {
    id: 'views.Auth.RestorePassword.passwordPlaceholder',
    defaultMessage: 'Ej. Gy43@g32VFINmfGT1'
  },
  changePassword: {
    id: 'views.Auth.RestorePassword.changePassword',
    defaultMessage: 'Cambiar contraseña'
  }
})

import { defineMessages } from 'react-intl'

export const messages = defineMessages({
  title: {
    id: 'views.Auth.RestorePassword.title',
    defaultMessage: 'Restablecer contraseña'
  },
  subtitle: {
    id: 'views.Auth.RestorePassword.subtitle',
    defaultMessage:
      'Ingresa tus nuevas credenciales y el código de seguridad que recibiste a tu correo.'
  },
  newPassword: {
    id: 'views.Auth.RestorePassword.newPassword',
    defaultMessage: 'Nueva contraseña'
  },
  confirmPassword: {
    id: 'views.Auth.RestorePassword.confirmPassword',
    defaultMessage: 'Confirmar contraseña'
  },
  secureCode: {
    id: 'views.Auth.RestorePassword.secureCode',
    defaultMessage: 'Código de seguridad'
  },
  passwordDontMatch: {
    id: 'views.Auth.RestorePassword.passwordDontMatch',
    defaultMessage: 'Las contraseñas no coinciden'
  },
  successfulProcess: {
    id: 'views.Auth.RestorePassword.successfulProcess',
    defaultMessage: 'Proceso exitoso'
  },
  goToLogin: {
    id: 'views.Auth.RestorePassword.goToLogin',
    defaultMessage:
      'Ve al inicio de sesión para acceder nuevamente a la plataforma'
  },
  goBackToLogin: {
    id: 'views.Auth.RestorePassword.goBackToLogin',
    defaultMessage: 'Volver al inicio de sesión'
  }
})

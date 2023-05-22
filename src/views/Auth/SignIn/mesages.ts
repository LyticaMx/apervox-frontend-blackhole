import { defineMessages } from 'react-intl'

export const signInMessages = defineMessages({
  description: {
    id: 'views.Auth.SignIn',
    defaultMessage:
      'Ingresa los datos de acceso para ingresar a la plataforma Black Hole.'
  },
  userPlaceholder: {
    id: 'views.Auth.SignIn.userPlaceholder',
    defaultMessage: 'Ej. afernandez'
  },
  passwordPlaceholder: {
    id: 'views.Auth.SignIn.passwordPlaceholder',
    defaultMessage: 'Ej. Gy43@g32VFINmfGT1'
  },
  forgotPassword: {
    id: 'views.Auth.SignIn.forgotPassword',
    defaultMessage: 'Olvidé mi contraseña'
  },
  logIn: {
    id: 'views.Auth.SignIn.logIn',
    defaultMessage: 'Iniciar sesión'
  },
  timeToWaitForLogin: {
    id: 'views.Auth.SignIn.timeToWaitForLogin',
    defaultMessage: 'Para volver a iniciar sesión'
  }
})

export const forgotPasswordMessages = defineMessages({
  title: {
    id: 'views.Auth.ForgotPasswordDialog.title',
    defaultMessage: 'Recuperar contraseña'
  },
  description: {
    id: 'views.Auth.ForgotPasswordDialog.description',
    defaultMessage:
      'Para recuperar tu contraseña es necesario contactar a un administrador.'
  }
})

export const closeAllSessionsMessages = defineMessages({
  title: {
    id: 'views.Auth.CloseAllSessions.title',
    defaultMessage: 'Has llegado al límite máximo de sesiones'
  },
  description: {
    id: 'views.Auth.CloseAllSessions.description',
    defaultMessage: '¿Deseas cerrar todas y crear una nueva?'
  }
})

import { defineMessages } from 'react-intl'

export const signUpMessages = defineMessages({
  // Steps
  account: {
    id: 'views.Auth.SignUp.account',
    defaultMessage: 'Cuenta'
  },
  personalData: {
    id: 'views.Auth.SignUp.personalData',
    defaultMessage: 'Datos personales'
  },
  request: {
    id: 'views.Auth.SignUp.request',
    defaultMessage: 'Solicitar'
  },

  // SubmitMessage
  title: {
    id: 'views.Auth.SignUp.title',
    defaultMessage: 'Solicitud enviada'
  },
  description: {
    id: 'views.Auth.SignUp.description',
    defaultMessage:
      'De ser aprobada tu solicitud recibirás un correo electrónico con tus accesos.'
  }
})

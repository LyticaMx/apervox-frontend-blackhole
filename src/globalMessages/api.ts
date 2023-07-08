import { defineMessages } from 'react-intl'

export const apiMessages = defineMessages({
  success: {
    id: 'global.api.success',
    defaultMessage: '¡Satisfactorio!'
  },
  /* session */
  sessionExpired: {
    id: 'global.api.sessionExpired',
    defaultMessage: 'La sesión expiro'
  },
  loginElsewhere: {
    id: 'global.api.loginElsewhere',
    defaultMessage: 'Inicio sesión en otro lugar'
  },
  /* errors */
  unexpected: {
    id: 'global.api.unexpected',
    defaultMessage: 'Ocurrió un error inesperado'
  },
  noContent: {
    id: 'global.api.noContent',
    defaultMessage: 'No se encontraron registros'
  },
  invalid_credentials: {
    id: 'global.api.invalid_credentials',
    defaultMessage: 'Credenciales inválidas'
  },
  user_unaccepted: {
    id: 'global.api.user_unaccepted',
    defaultMessage: 'Usuario no verificado'
  },
  user_blocked: {
    id: 'global.api.user_blocked',
    defaultMessage: 'Usuario bloqueado'
  },
  loadingMore: {
    id: 'global.api.loadingMore',
    defaultMessage: 'Cargando más'
  }
})

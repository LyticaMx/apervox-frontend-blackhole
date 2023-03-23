import { defineMessages } from 'react-intl'

export const techniquesMessages = defineMessages({
  title: {
    id: 'views.Techniques.title',
    defaultMessage: 'Técnicas'
  },
  subtitle: {
    id: 'views.Techniques.subtitle',
    defaultMessage: 'Técnicas existentes en la plataforma'
  },
  button: {
    id: 'views.Techniques.button',
    defaultMessage: 'Agregar técnica'
  }
})

export const techniquesDeleteDialogMessages = defineMessages({
  title: {
    id: 'views.techniques.deleteDialog.title',
    defaultMessage: 'Eliminar técnica'
  },
  message: {
    id: 'views.techniques.deleteDialog.message',
    defaultMessage:
      '¿Qué tipo de eliminación te gustaría realizar a esta técnica?'
  },
  removeCompletely: {
    id: 'views.techniques.deleteDialog.removeCompletely',
    defaultMessage: 'Eliminar completamente la técnica'
  },
  removeOnlyFiles: {
    id: 'views.techniques.deleteDialog.removeOnlyFiles',
    defaultMessage: 'Eliminar únicamente archivos'
  },
  hazardConfirmation: {
    id: 'views.techniques.deleteDialog.hazardConfirmation',
    defaultMessage:
      'Acepto y comprendo los riesgos legales y de autorías derivados de la acción de eliminar el registro.'
  },
  passwordConfirmMessage: {
    id: 'views.techniques.deleteDialog.passwordConfirmMessage',
    defaultMessage: 'Ingresa tu contraseña para validar la eliminación.'
  }
})

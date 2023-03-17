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
    defaultMessage: 'Eliminar grupo de trabajo'
  },
  message: {
    id: 'views.techniques.deleteDialog.message',
    defaultMessage:
      '¿Estas seguro de querer eliminar {selected, plural, one {la técnica seleccionada} other {las # técnicas seleccionadas}}?'
  },
  passwordConfirmMessage: {
    id: 'views.techniques.deleteDialog.passwordConfirmMessage',
    defaultMessage:
      'Ingresa tu contraseña para validar la eliminación {selected, plural, one {dla técnica seleccionada} other {de las # técnicas seleccionadas}}'
  }
})

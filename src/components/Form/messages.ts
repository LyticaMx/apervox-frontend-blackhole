import { defineMessages } from 'react-intl'

export const passwordFieldMessages = defineMessages({
  veryWeak: {
    id: 'components.Form.PasswordField.PasswordStrength.veryWeak',
    defaultMessage: 'Muy débil'
  },
  weak: {
    id: 'components.Form.PasswordField.PasswordStrength.weak',
    defaultMessage: 'Débil'
  },
  okay: {
    id: 'components.Form.PasswordField.PasswordStrength.okay',
    defaultMessage: 'Okay'
  },
  good: {
    id: 'components.Form.PasswordField.PasswordStrength.good',
    defaultMessage: 'Buena'
  },
  strong: {
    id: 'components.Form.PasswordField.PasswordStrength.strong',
    defaultMessage: 'Fuerte'
  }
})

export const multiValueContainerMessages = defineMessages({
  selectedElements: {
    id: 'components.Form.SelectPaginate.MultiValueContainer.selectedElements',
    defaultMessage: 'Elementos seleccionados'
  }
})

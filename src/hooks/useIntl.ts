import { MessageDescriptor, useIntl as hookUseIntl } from 'react-intl'
import * as globalMessages from 'globalMessages'

type useGlobalMessageResponse = (
  key: string,
  type: keyof typeof globalMessages
) => string
type useIntlResponse = (key: string, options?: any) => string

export const useGlobalMessage = (): useGlobalMessageResponse => {
  const intl = hookUseIntl()

  return (key: string, type: keyof typeof globalMessages): string => {
    return intl.formatMessage(globalMessages[type][key])
  }
}

export const useFormatMessage = (
  messages: Record<string, MessageDescriptor>
): useIntlResponse => {
  const intl = hookUseIntl()

  return (key: string, options?: any): string => {
    if (key in messages) return intl.formatMessage(messages[key], options)

    if (key in globalMessages.actionsMessages) {
      return intl.formatMessage(globalMessages.actionsMessages[key], options)
    }
    if (key in globalMessages.formMessages) {
      return intl.formatMessage(globalMessages.formMessages[key], options)
    }
    if (key in globalMessages.generalMessages) {
      return intl.formatMessage(globalMessages.generalMessages[key], options)
    }
    if (key in globalMessages.timeMessages) {
      return intl.formatMessage(globalMessages.timeMessages[key], options)
    }

    return ''
  }
}

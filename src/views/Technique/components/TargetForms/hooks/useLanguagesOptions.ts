import { useFormatMessage } from 'hooks/useIntl'
import { languagesFormMessages } from 'views/Technique/messages'

const useLanguagesOptions = (): {
  language: Array<Record<string, string>>
  languageProficiency: Array<Record<string, string>>
} => {
  const getMessage = useFormatMessage(languagesFormMessages)

  const language = [
    { text: getMessage('english'), value: 'english' },
    { text: getMessage('spanish'), value: 'spanish' },
    { text: getMessage('french'), value: 'french' },
    { text: getMessage('german'), value: 'german' },
    { text: getMessage('italian'), value: 'italian' },
    { text: getMessage('portuguese'), value: 'portuguese' },
    { text: getMessage('chinese'), value: 'chinese' },
    { text: getMessage('japanese'), value: 'japanese' },
    { text: getMessage('korean'), value: 'korean' },
    { text: getMessage('arabic'), value: 'arabic' },
    { text: getMessage('russian'), value: 'russian' },
    { text: getMessage('dutch'), value: 'dutch' },
    { text: getMessage('swedish'), value: 'swedish' },
    { text: getMessage('greek'), value: 'greek' },
    { text: getMessage('hindi'), value: 'hindi' },
    { text: getMessage('other'), value: 'other' }
  ]

  const languageProficiency = [
    { text: getMessage('basic'), value: 'basic' },
    { text: getMessage('intermediate'), value: 'intermediate' },
    { text: getMessage('advanced'), value: 'advanced' },
    { text: getMessage('fluent'), value: 'fluent' },
    { text: getMessage('native'), value: 'native' }
  ]

  return { language, languageProficiency }
}

export default useLanguagesOptions

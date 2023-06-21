import { useFormatMessage } from 'hooks/useIntl'
import { physicalDescriptionFormMessages } from 'views/Technique/messages'

export const usePhysicalDescriptionOptions = (): {
  bodyTypes: Array<Record<string, string>>
  skinTypes: Array<Record<string, string>>
  hairLength: Array<Record<string, string>>
  hairTypes: Array<Record<string, string>>
  hairColor: Array<Record<string, string>>
} => {
  const getMessage = useFormatMessage(physicalDescriptionFormMessages)

  const bodyTypes = [
    { text: getMessage('thin'), value: 'thin' },
    { text: getMessage('slim'), value: 'slim' },
    { text: getMessage('athletic'), value: 'athletic' },
    { text: getMessage('muscular'), value: 'muscular' },
    { text: getMessage('curvy'), value: 'curvy' },
    { text: getMessage('average'), value: 'average' },
    { text: getMessage('chubby'), value: 'chubby' },
    { text: getMessage('overweight'), value: 'overweight' },
    { text: getMessage('obese'), value: 'obese' },
    { text: getMessage('other'), value: 'other' }
  ]

  const skinTypes = [
    { text: getMessage('lighter'), value: 'lighter' },
    { text: getMessage('light'), value: 'light' },
    { text: getMessage('lightBrown'), value: 'light_brown' },
    { text: getMessage('darkBrown'), value: 'dark_brown' },
    { text: getMessage('dark'), value: 'dark' },
    { text: getMessage('darker'), value: 'darker' }
  ]

  const hairLength = [
    { text: getMessage('bald'), value: 'bald' },
    { text: getMessage('short'), value: 'short' },
    { text: getMessage('medium'), value: 'medium' },
    { text: getMessage('long'), value: 'long' },
    { text: getMessage('extraLong'), value: 'extra_long' }
  ]

  const hairTypes = [
    { text: getMessage('straight'), value: 'straight' },
    { text: getMessage('wavy'), value: 'wavy' },
    { text: getMessage('curly'), value: 'curly' },
    { text: getMessage('kinky'), value: 'kinky' }
  ]

  const hairColor = [
    { text: getMessage('white'), value: 'white' },
    { text: getMessage('lightBlonde'), value: 'light_blonde' },
    { text: getMessage('darkBlonde'), value: 'dark_blonde' },
    { text: getMessage('auburn'), value: 'auburn' },
    { text: getMessage('chestnut'), value: 'chestnut' },
    { text: getMessage('brown'), value: 'brown' },
    { text: getMessage('red'), value: 'red' },
    { text: getMessage('gray'), value: 'gray' },
    { text: getMessage('black'), value: 'black' },
    { text: getMessage('other'), value: 'other' }
  ]

  return { bodyTypes, skinTypes, hairLength, hairTypes, hairColor }
}

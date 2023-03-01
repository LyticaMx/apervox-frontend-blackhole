interface TechniqueStatusI18Key {
  i18Key: string
  i18AbbreviatedKey: string
}

export const getTechniqueStatusI18Key = (
  key: string
): TechniqueStatusI18Key => {
  let i18Key = ''
  let i18AbbreviatedKey = ''

  switch (key) {
    case 'assigned':
      i18Key = 'assignedPluralFemale'
      i18AbbreviatedKey = 'assignedShortAbbreviation'
      break

    case 'current':
      i18Key = 'currentPlural'
      i18AbbreviatedKey = 'currentShortAbbreviation'
      break

    case 'to_conclude':
      i18Key = 'toConclude'
      i18AbbreviatedKey = 'toConcludeShortAbbreviation'
      break

    case 'concluded':
      i18Key = 'concludedPluralFemale'
      i18AbbreviatedKey = 'concludedShortAbbreviation'
      break

    default:
      break
  }

  return {
    i18Key,
    i18AbbreviatedKey
  }
}

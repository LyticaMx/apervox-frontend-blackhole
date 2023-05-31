import { useLanguage } from 'context/Language'
import { useMemo } from 'react'
import { Section } from 'types/form'
import { NonEmptyArray, ReadOnlyNonEmptyArray } from 'types/utils'

const useSections = (
  sectionsFactory: () => NonEmptyArray<Section>,
  dependencies?: ReadOnlyNonEmptyArray<unknown>
): NonEmptyArray<Section> => {
  const { localeI18n } = useLanguage()

  const dependenciesMemo = useMemo(
    () => (dependencies ? dependencies.concat([localeI18n]) : [localeI18n]),
    [dependencies, localeI18n]
  )

  const sectionsMemo: NonEmptyArray<Section> = useMemo<NonEmptyArray<Section>>(
    sectionsFactory,
    dependenciesMemo
  )

  return sectionsMemo
}

export default useSections

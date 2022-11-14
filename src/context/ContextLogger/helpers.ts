/* eslint-disable no-console */
import {
  forEach,
  get,
  keys as getKeys,
  isArray,
  isNull,
  isFunction,
  isObject,
  fromPairs,
  differenceWith,
  toPairs,
  isEqual
} from 'lodash'

import {
  ObjectType,
  StyleByTheme,
  Style,
  FullStyleByTheme,
  PrintValue,
  GroupHeader
} from 'types/contextLogger'

const getObjectDiff = (a: ObjectType, b: ObjectType): ObjectType =>
  fromPairs(differenceWith(toPairs(a), toPairs(b), isEqual))

const prefersDarkMode: boolean = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches

const consoleTheme: string = prefersDarkMode ? 'dark' : 'light'

const textStyleByTheme: StyleByTheme = {
  dark: 'font-size: 12px; padding: 4px; border-radius: 2px; color: #9EDFF7;',
  light: 'font-size: 12px; padding: 4px; border-radius: 2px; color: #142179;'
}

const textStyle: string = get(textStyleByTheme, consoleTheme)

const textBodyStyleByTheme: StyleByTheme = {
  dark: 'background-color: transparent; text-decoration: none; color: #D48A67;',
  light: 'background-color: transparent; text-decoration: none; color: #A31710;'
}

const textBodyStyle: string = get(textBodyStyleByTheme, consoleTheme)

const consoleThemeStyles: FullStyleByTheme = {
  dark: {
    groupTitleNameStyle: `${textStyle} color: #579BD4;`,
    groupTitleDateStyle: `${textStyle} color: #4AAADC;`,
    keyNameStyle: `${textStyle}`,
    arrowStyle: `${textStyle} color: #579BD4; margin: 0 4px`,
    prevStateStyle: `${textStyle} background-color: rgba(139, 40, 40, 0.5); text-decoration: line-through; color: #c5c5c5;`,
    newStateStyle: `${textStyle} background-color: rgba(70, 165, 70, 0.4); color: #e2e2e2;`
  },
  light: {
    groupTitleNameStyle: `${textStyle} color: #0A69BC;`,
    groupTitleDateStyle: `${textStyle}`,
    keyNameStyle: `${textStyle}`,
    arrowStyle: `${textStyle} color: rgb(0, 156, 196);`,
    prevStateStyle: `${textStyle} background-color: rgba(160, 10, 10, 0.4); text-decoration: line-through; color: black;`,
    newStateStyle: `${textStyle} background-color: rgba(24, 149, 20, 0.3); color: black;`
  }
}

const fullStyle: Style = get(consoleThemeStyles, consoleTheme)

const {
  keyNameStyle,
  arrowStyle,
  prevStateStyle,
  newStateStyle,
  groupTitleNameStyle,
  groupTitleDateStyle
} = fullStyle

const printValue = ({
  key,
  prevValue,
  newValue,
  hasDiff,
  isGroup
}: PrintValue): void => {
  const consoleHandler: any = isGroup ? console.groupCollapsed : console.log

  if (hasDiff) {
    consoleHandler(
      '%c%s%c%s%c%s%c%s',
      keyNameStyle,
      `${key}:`,
      prevStateStyle +
        (!hasDiff
          ? 'background-color: transparent; text-decoration: none;'
          : ''),
      prevValue,
      arrowStyle,
      '=>',
      newStateStyle + (!hasDiff ? 'background-color: transparent;' : ''),
      newValue
    )
  } else {
    consoleHandler(
      '%c%s%c%s',
      keyNameStyle,
      `${key}:`,
      prevStateStyle + (!hasDiff ? textBodyStyle : ''),
      prevValue
    )
  }
}

const printGroupHeader = ({ name }: GroupHeader): void => {
  // console.log('\n');
  console.group(
    '%c%s%c%s',
    groupTitleNameStyle,
    name,
    groupTitleDateStyle,
    new Date().toLocaleString()
  )
}

const logDiffs = ({
  name = '',
  prevState = {},
  newState = {},
  printSeparator = true,
  config = { arrayDiffs: true, objectDiffs: true }
}): void => {
  const keys: string[] = getKeys(prevState)

  if (printSeparator) printGroupHeader({ name, isMain: true })

  forEach(keys, (key: string) => {
    let prevValue = get(prevState, key)
    const newValue = get(newState, key)
    const hasDiff = prevValue !== newValue

    if (isNull(prevValue)) prevValue = newValue

    if (isFunction(newValue)) return

    if (isArray(newValue) || isObject(newValue)) {
      printValue({
        key,
        prevValue,
        newValue,
        hasDiff,
        isGroup: true
      })

      let prevValueParsed = prevValue

      if (isArray(newValue)) {
        prevValueParsed = config.arrayDiffs ? prevValue : newValue
      } else if (isObject(newValue)) {
        prevValueParsed = config.objectDiffs ? prevValue : newValue
      }

      // Check if the typeof corresponds to a React component
      const isSymbol = typeof get(newValue, '$$typeof') === 'symbol'

      if (isSymbol) {
        console.log('--> LogDiffs has disabled for Symbol items <--')
      }

      if (!isSymbol) {
        logDiffs({
          name: key,
          prevState: prevValueParsed,
          newState: newValue,
          printSeparator: false,
          config
        })
      }

      console.groupEnd()

      return
    }

    printValue({ key, prevValue, newValue, hasDiff, isGroup: false })
  })

  if (printSeparator) console.groupEnd()
}

export { logDiffs, getObjectDiff }

export interface ObjectType {
  [key: string]: any
}

export interface StyleByTheme {
  dark: string
  light: string
}

export interface Style {
  groupTitleNameStyle: string
  groupTitleDateStyle: string
  keyNameStyle: string
  arrowStyle: string
  prevStateStyle: string
  newStateStyle: string
}

export interface FullStyleByTheme {
  dark: Style
  light: Style
}

export interface PrintValue {
  key: string
  prevValue: any
  newValue: any
  hasDiff: boolean
  isGroup: boolean
}

export interface GroupHeader {
  name: string
  isMain?: boolean
}

import { Columns, Spacing } from 'components/Grid'
import { Style, Variant } from 'components/Typography'
import { InputHTMLAttributes, ReactElement } from 'react'
import { DropzoneOptions } from 'react-dropzone'

type Item = Record<string, any>

export interface TextFieldProps {
  id: string
  label?: string
  type?: string
  className?: string
  autoComplete?: string
  required?: boolean
  placeholder?: string
  multiline?: boolean
  rows?: number
  labelSpacing?: '1' | '2' | '3' | '4' | '5'
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  labelClassname?: string
}

export interface PasswordFieldProps {
  id: string
  label?: string
  className?: string
  autoComplete?: string
  required?: boolean
  error?: boolean
  helperText?: string
  placeholder?: string
  rows?: number
  labelSpacing?: '1' | '2' | '3' | '4' | '5'
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  labelClassname?: string
}

export interface CheckboxProps {
  id?: string
  label: string
  description?: string
  className?: string
  required?: boolean
  value?: any
  disabled?: boolean
  color?:
    | 'base'
    | 'slate'
    | 'red'
    | 'yellow'
    | 'orange'
    | 'green'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'purple'
}

export interface AutocompleteProps {
  label?: string
  items: Item[]
  placeholder?: string
  textField: string
  valueField: string
  className?: string
  onQueryChange?: (value: any) => void
  noFoundText: ReactElement | string
}

export interface DatePickerProps {
  label?: string
  formatDisplay: string

  id: string
  clearable?: boolean
  required?: boolean
  placeholder?: string
  minDate?: string
  maxDate?: string
}

export interface DateRangePickerProps {
  id?: string
  label?: string
  required?: boolean
  formatDisplay?: string
  clearable?: boolean
  placeholder?: string
  minDate?: string
  maxDate?: string
}

export interface DragAndDropProps extends DropzoneOptions {
  onChange?: (files: any) => void
}

export interface RadioProps {
  id?: string
  label: string
  description?: string
  className?: string
  required?: boolean
  checked?: boolean
  disabled?: boolean
  value: any
}

export interface SelectProps {
  label?: string
  placeholder?: string
  items: Item[]
  textField: string
  valueField: string
  clearable: boolean
  disabled?: boolean
}

export interface SelectMultipleProps {
  label?: string
  items: Item[]
  textField: string
  valueField: string
  noFoundText: string
}

export interface SwitchProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  stopPropagation?: boolean
}

export declare type FieldTypes =
  | {
      readonly type: 'text'
      options: TextFieldProps
    }
  | {
      readonly type: 'password'
      options: PasswordFieldProps
    }
  | {
      readonly type: 'checkbox'
      options: CheckboxProps
    }
  | {
      readonly type: 'autocomplete'
      options: AutocompleteProps
    }
  | {
      readonly type: 'date'
      options: DatePickerProps
    }
  | {
      readonly type: 'date-range'
      options: DateRangePickerProps
    }
  | {
      readonly type: 'drag-and-drop'
      options: DragAndDropProps
    }
  | {
      readonly type: 'radio'
      options: RadioProps
    }
  | {
      readonly type: 'select'
      options: SelectProps
    }
  | {
      readonly type: 'select-multiple'
      options: SelectMultipleProps
    }
  | {
      readonly type: 'switch'
      options: SwitchProps
    }

interface Breakpoints {
  xs?: Columns
  sm?: Columns
  md?: Columns
  lg?: Columns
  xl?: Columns
}

export type Field = FieldTypes & {
  name: string
  breakpoints?: Breakpoints
  section?: string
}

export interface SubmitButtonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?:
    | 'base'
    | 'red'
    | 'yellow'
    | 'orange'
    | 'green'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'purple'
  variant?: 'text' | 'outlined' | 'contained'
  margin?: 'none' | 'normal' | 'dense'
  fullwidth?: boolean
  disabled?: boolean
}

export interface Section {
  name: string
  spacing?: Spacing
  title?: {
    text: string
    className?: string
    noWrao?: boolean
    variant?: Variant
    style?: Style
  }
  description?: {
    text: string
    className?: string
    noWrao?: boolean
    variant?: Variant
    style?: Style
  }
}

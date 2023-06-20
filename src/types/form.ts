import { Columns, Spacing } from 'components/Grid'
import { Style, Variant } from 'components/Typography'
import { FormikErrors, FormikTouched } from 'formik'
import { ReactNode } from 'react'
import { Props as TextFieldPropsOrigin } from 'components/Form/Textfield'
import { Props as CheckboxPropsOrigin } from 'components/Form/Checkbox'
import { Props as PasswordFieldPropsOrigin } from 'components/Form/PasswordField'
import { Props as AutocompletePropsOrigin } from 'components/Form/Autocomplete'
import { Props as DatepickerPropsOrigin } from 'components/Form/Datepicker'
import { Props as DateRangePickerPropsOrigin } from 'components/Form/Daterangepicker'
import { Props as DragDropPropsOrigin } from 'components/Form/DragDrop'
import { Props as RadioPropsOrigin } from 'components/Form/Radio'
import { Props as SelectPropsOrigin } from 'components/Form/Select'
import { Props as SelectMultiplePropsOrigin } from 'components/Form/Selectmultiple'
import { Props as MultiChipSelectPropsOrigin } from 'components/Form/Selectmultiple/MultiChip'
import { Props as SwitchPropsOrigin } from 'components/Form/Switch'
import { Props as AsyncSelectPropsOrigin } from 'components/Form/SelectPaginate'
import { Props as CitySelectorPropsOrigin } from 'components/Form/CitySelector'
import { KeyofWithSymbol } from './utils'

export type TextFieldProps = Omit<
  TextFieldPropsOrigin,
  'value' | 'onChange' | 'onBlur' | 'error' | 'helperText'
>

export type PasswordFieldProps = Omit<
  PasswordFieldPropsOrigin,
  'name' | 'value' | 'onChange' | 'onBlur'
>

export type CheckboxProps = Omit<
  CheckboxPropsOrigin,
  'name' | 'checked' | 'onChange' | 'onBlur'
>

export type AutocompleteProps = Omit<
  AutocompletePropsOrigin,
  'value' | 'onChange'
>

export type DatePickerProps = Omit<
  DatepickerPropsOrigin,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
>

export type DateRangePickerProps = Omit<
  DateRangePickerPropsOrigin,
  'name' | 'value' | 'onChange' | 'error' | 'helperText'
>

export type DragAndDropProps = DragDropPropsOrigin

export type RadioProps = Omit<
  RadioPropsOrigin,
  'name' | 'checked' | 'onChange' | 'onBlur'
>

export type SelectProps = Omit<
  SelectPropsOrigin,
  'value' | 'onChange' | 'error' | 'helperText'
>

export type SelectMultipleProps = Omit<
  SelectMultiplePropsOrigin,
  'value' | 'selected' | 'onChange'
>

export type MultiChipSelectProps = Omit<
  MultiChipSelectPropsOrigin,
  'value' | 'selected' | 'onChange'
>

export type AsyncSelectProps = Omit<
  AsyncSelectPropsOrigin,
  'value' | 'onChange' | 'error' | 'helperText'
>

export type SwitchProps = Omit<SwitchPropsOrigin, 'value' | 'onChange'> & {
  label?: string
}

export type CitySelectorProps = Partial<
  Omit<
    CitySelectorPropsOrigin,
    | 'country'
    | 'state'
    | 'city'
    | 'onChange'
    | 'countryError'
    | 'countryHelperText'
    | 'stateError'
    | 'stateHelperText'
    | 'cityError'
    | 'cityHelperText'
  >
>

export interface CustomFieldFunctionProps<T> {
  name: string
  values: T
  errors: FormikErrors<T>
  touched: FormikTouched<T>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  setFieldTouched: (
    field: string,
    isTouched: boolean,
    shouldValidate?: boolean
  ) => void
}

export declare type FieldTypes<T> =
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
      readonly type: 'async-select'
      options: AsyncSelectProps
    }
  | {
      readonly type: 'select-multiple'
      options: SelectMultipleProps
    }
  | {
      readonly type: 'multi-chip-select'
      options: MultiChipSelectProps
    }
  | {
      readonly type: 'switch'
      options: SwitchProps
    }
  | {
      readonly type: 'custom'
      children: ReactNode | React.FC<CustomFieldFunctionProps<T>>
    }
  | {
      readonly type: 'city-selector'
      options: CitySelectorProps
    }

export interface Breakpoints {
  xs?: Columns
  sm?: Columns
  md?: Columns
  lg?: Columns
  xl?: Columns
}

export type Field<T> = FieldTypes<T> & {
  name: string
  breakpoints?: Breakpoints
  section?: string
  renderIf?: Partial<Record<KeyofWithSymbol<T, '!'>, any>> &
    Partial<Record<keyof T, any>>
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
    | 'primary'
  variant?: 'text' | 'outlined' | 'contained'
  margin?: 'none' | 'normal' | 'dense'
  fullwidth?: boolean
  disabled?: boolean
}

export interface Section {
  name: string
  removeSeparator?: boolean
  spacing?: Spacing
  title?: {
    text: string
    className?: string
    noWrap?: boolean
    variant?: Variant
    style?: Style
  }
  description?: {
    text: string
    className?: string
    noWrap?: boolean
    variant?: Variant
    style?: Style
  }
  className?: string
}

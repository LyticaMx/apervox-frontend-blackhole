import clsx from 'clsx'
import { FormikContextType } from 'formik'
import { ReactNode } from 'react'
import { Field } from 'types/form'
import Autocomplete from './Autocomplete'
import Checkbox from './Checkbox'
import Datepicker from './Datepicker'
import Daterangepicker from './Daterangepicker'
import DragDrop from './DragDrop'
import PasswordField from './PasswordField'
import Radio from './Radio'
import SelectField from './Select'
import Selectmultiple from './Selectmultiple'
import MultiChip from './Selectmultiple/MultiChip'
import Switch from './Switch'
import TextField from './Textfield'
import SelectPaginate from './SelectPaginate'

interface Params<T> {
  field: Field<T>
  formik: FormikContextType<T>
}

export const fieldMapper = <T,>({ field, formik }: Params<T>): ReactNode => {
  const { name } = field

  switch (field.type) {
    case 'text':
      return (
        <TextField
          {...field.options}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors[name] && !!formik.touched[name]}
          helperText={
            !!formik.errors[name] && !!formik.touched[name]
              ? formik.errors[name]
              : ''
          }
        />
      )
    case 'password':
      return (
        <PasswordField
          {...field.options}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors[name] && !!formik.touched[name]}
          helperText={
            !!formik.errors[name] && !!formik.touched[name]
              ? formik.errors[name]
              : ''
          }
        />
      )
    case 'select':
      return (
        <SelectField
          {...field.options}
          value={formik.values[name]}
          onChange={(val) => formik.setFieldValue(name, val)}
          error={!!formik.errors[name] && !!formik.touched[name]}
          helperText={
            !!formik.errors[name] && !!formik.touched[name]
              ? formik.errors[name]
              : ''
          }
        />
      )
    case 'date':
      return (
        <Datepicker
          {...field.options}
          name={name}
          value={formik.values[name]}
          onChange={(val) => formik.setFieldValue(name, val)}
          error={!!formik.errors[name] && !!formik.touched[name]}
          helperText={
            !!formik.errors[name] && !!formik.touched[name]
              ? formik.errors[name]
              : ''
          }
        />
      )
    case 'async-select':
      return (
        <SelectPaginate
          {...field.options}
          value={formik.values[name]}
          onChange={(val) => formik.setFieldValue(name, val)}
          error={!!formik.errors[name] && !!formik.touched[name]}
          helperText={
            !!formik.errors[name] && !!formik.touched[name]
              ? formik.errors[name]
              : ''
          }
        />
      )
    case 'select-multiple':
      return (
        <div>
          <Selectmultiple
            {...field.options}
            selected={formik.values[name]}
            onChange={(value) => formik.setFieldValue(name, value)}
          />
          {formik.errors[name] && formik.touched[name] ? (
            <span className="mt-2 bg-red-500">{formik.errors[name]}</span>
          ) : (
            ''
          )}
        </div>
      )
    case 'multi-chip-select':
      return (
        <div>
          <MultiChip
            {...field.options}
            selected={formik.values[name]}
            onChange={(value) => formik.setFieldValue(name, value)}
          />
          {formik.errors[name] && formik.touched[name] ? (
            <span className="mt-2 bg-red-500">{formik.errors[name]}</span>
          ) : (
            ''
          )}
        </div>
      )
    case 'autocomplete':
      return (
        <div>
          <Autocomplete
            {...field.options}
            className={clsx(
              field.options.className,
              !!formik.errors[name] && !!formik.touched[name]
                ? '!border-red-500 !border-2'
                : ''
            )}
            value={formik.values[name]}
            onChange={(val) => formik.setFieldValue(name, val)}
          />
          {!!formik.errors[name] && !!formik.touched[name] ? (
            <span className="text-red-500 mt-2">{formik.errors[name]}</span>
          ) : (
            ''
          )}
        </div>
      )
    case 'checkbox':
      return (
        <div>
          <Checkbox
            {...field.options}
            name={name}
            checked={
              Array.isArray(formik.values[name])
                ? formik.values[name].includes(field.options.value)
                : formik.values[name]
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched[name] && !!formik.errors[name] ? (
            <span className="text-red-500 mt-1 block text-xs">
              {formik.errors[name]}
            </span>
          ) : (
            ''
          )}
        </div>
      )
    case 'drag-and-drop':
      // Revisar como utilizar los archivos del drag and drop
      return <DragDrop {...field.options} />
    case 'radio':
      return (
        <Radio
          {...field.options}
          name={name}
          checked={formik.values[name] === field.options.value}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      )
    case 'date-range':
      return (
        <Daterangepicker
          {...field.options}
          name={name}
          value={formik.values[name]}
          onChange={(dates) => formik.setFieldValue(name, dates)}
          error={!!formik.errors[name] && !!formik.touched[name]}
          helperText={
            !!formik.errors[name] && !!formik.touched[name]
              ? formik.errors[name]
              : ''
          }
        />
      )

    case 'switch':
      return (
        <div className="flex gap-2 items-center mt-2">
          <Switch
            {...field.options}
            value={formik.values[name]}
            onChange={(val) => formik.setFieldValue(name, val)}
          />

          <span className="text-sm">{field.options.label}</span>
        </div>
      )
    case 'custom':
      if (typeof field.children === 'function') {
        return (
          <field.children
            name={field.name}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            setFieldValue={formik.setFieldValue}
            setFieldTouched={formik.setFieldTouched}
          />
        )
      }
      return field.children
    default:
      return null
  }
}

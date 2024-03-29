import { ReactElement, ReactNode, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as yup from 'yup'

import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'

import { actionsMessages, formMessages, generalMessages } from 'globalMessages'

import TextField from 'components/Form/Textfield'
import Radio from 'components/Form/Radio'
import StaticFilterComponent from './StaticFilter'
import { useAutoCloseDialog } from 'hooks/useAutoCloseDialog'
import Typography from 'components/Typography'

export type InputType =
  | 'datepicker'
  | 'select'
  | 'text'
  | 'autocomplete'
  | 'checkbox'
  | 'radio'
  | 'divider'
  | 'asyncSelect'

interface Values {
  search: string
  fields: string[]
  staticFilters: Record<string, string | string[]>
}

export interface FilterItem {
  label: string
  name: string
}

export interface StaticFilter {
  name: string
  label: string
  options: Array<{
    name: string
    value: string
  }>
  multiple?: boolean
}

interface Props {
  items?: FilterItem[]
  onSubmit?: (values: any) => any
  onReset?: () => void
  onClose?: () => void
  initialValues?: Values
  values?: Values
  children?: ReactNode
  acceptText?: ReactNode
  cancelText?: ReactNode
  disabledEmpty?: boolean
  staticFilters?: StaticFilter[]
}

const FilterByField = ({
  items = [],
  onSubmit,
  onReset,
  onClose,
  initialValues,
  values,
  children,
  acceptText,
  cancelText,
  disabledEmpty = false,
  staticFilters = []
}: Props): ReactElement => {
  const intl = useIntl()
  const { open, popoverRef, setOpen } = useAutoCloseDialog()

  const toggle = (): void => {
    setOpen(!open)
  }

  const handleClose = (): void => {
    if (onClose) onClose()
    setOpen(false)
  }

  const initialStaticValues = useMemo(() => {
    return staticFilters.reduce<Record<string, string | string[]>>(
      (carry, item) => {
        carry[item.name] = item.multiple ? [] : ''

        return carry
      },
      {}
    )
  }, [staticFilters])

  const validationSchema = yup.object({
    search: yup.string(),
    fields: yup.mixed().when('search', {
      is: (val = '') => val.trim() !== '',
      then: (schema) =>
        schema.test({
          name: 'is-field-selected',
          test: (value) => {
            if (Array.isArray(value) && value.length === 0) return false
            return true
          },
          message: intl.formatMessage(formMessages.chooseAtLeastOneField)
        })
    })
  })

  const formik = useFormik({
    initialValues: {
      search: '',
      fields: [],
      staticFilters: initialStaticValues,
      ...initialValues
    },
    validationSchema,
    onSubmit: (values) => {
      if (onSubmit) {
        // TODO: Revertir este cambio cuando los filtros sean OR y no AND
        onSubmit({
          search: values.search,
          fields:
            typeof values.fields === 'string' ? [values.fields] : values.fields,
          staticFilters: values.staticFilters
        })
      }
      if (handleClose) {
        handleClose()
      }
    }
  })

  const total = useMemo(() => {
    if (!values) return 0

    const { staticFilters } = values ?? {}

    return (
      values.fields.length +
      Object.keys(staticFilters ?? {}).reduce((carry, filter) => {
        return (
          carry +
          Number(
            typeof staticFilters[filter] === 'string'
              ? staticFilters[filter] !== ''
                ? 1
                : 0
              : staticFilters[filter].length
          )
        )
      }, 0)
    )
  }, [values])

  useEffect(() => {
    if (open && values) {
      formik.resetForm({
        values: values ?? {
          search: '',
          fields: [],
          staticFilters: initialStaticValues
        }
      })
    }
  }, [open, values])

  const disabled =
    disabledEmpty &&
    !Object.values(formik.values).filter((item) => item !== null).length

  return (
    <Popover className="relative inline-block">
      <Float
        show={open}
        placement="bottom-start"
        offset={5}
        shift={6}
        flip={10}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button
          className="gap-2 btn shadow-blackhole-md p-1.5"
          onClick={toggle}
        >
          <span className="px-2 py-0.5 rounded-md block text-primary text-sm bg-gray-100 min-w-[30px]">
            {total}
          </span>
          <AdjustmentsVerticalIcon className="w-5 h-5 text-secondary-gray" />
        </Popover.Button>
        <Popover.Panel
          static
          className="bg-white border border-gray-100 rounded-md shadow-lg focus:outline-none z-10 w-72"
        >
          <div
            className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
            ref={popoverRef}
          >
            <div className="px-4 pt-4 flex justify-between">
              <span>{intl.formatMessage(generalMessages.filters)}</span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    formik.resetForm({
                      values: { search: '', fields: [], staticFilters: {} }
                    })
                    if (onReset) onReset()
                  }}
                  className="text-sm text-primary"
                >
                  {intl.formatMessage(actionsMessages.clean)}
                </button>
                <div className="border border-gray-400 rounded-lg h-3"></div>
                <button
                  disabled={disabled}
                  className="text-sm text-primary"
                  onClick={() => formik.handleSubmit()}
                >
                  {acceptText ?? intl.formatMessage(actionsMessages.accept)}
                </button>
              </div>
            </div>

            <div className="p-4">
              <form
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                className={clsx(
                  staticFilters.length > 0 && 'max-h-96 overflow-auto p-0.5'
                )}
              >
                <TextField
                  id="search"
                  name="search"
                  placeholder={intl.formatMessage(actionsMessages.search)}
                  outlined
                  onChange={formik.handleChange}
                  value={formik.values.search}
                />

                <p className="mt-3 mb-2">Campos</p>
                <div
                  className={clsx(
                    'flex flex-col gap-1 pl-1 py-1',
                    formik.errors.fields &&
                      formik.touched.fields &&
                      'border rounded-sm border-red-500'
                  )}
                >
                  {items.map((item, index) => (
                    // TODO: Revertir este cambio cuando los filtros sean OR y no AND
                    <Radio
                      label={item.label}
                      key={index}
                      name="fields"
                      id={`fields-${item.name}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={item.name}
                      checked={formik.values.fields.includes(item.name)}
                    />
                  ))}
                  {formik.errors.fields && formik.touched.fields && (
                    <Typography variant="caption" className={'text-red-500'}>
                      {formik.errors.fields}
                    </Typography>
                  )}
                </div>
                <div className="mt-3">
                  {staticFilters.map((filter) => (
                    <StaticFilterComponent
                      key={filter.name}
                      onChange={async (value) =>
                        await formik.setFieldValue('staticFilters', {
                          ...formik.values.staticFilters,
                          [filter.name]: value
                        })
                      }
                      title={filter.label}
                      name={filter.name}
                      options={filter.options}
                      value={formik.values.staticFilters[filter.name]}
                      multiple={filter.multiple}
                    />
                  ))}
                </div>
              </form>
            </div>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default FilterByField

import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'

import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline'

import { actionsMessages, generalMessages } from 'globalMessages'

import TextField from 'components/Form/Textfield'
import Radio from 'components/Form/Radio'

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
}
export interface FilterItem {
  label: string
  name: string
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
  disabledEmpty = false
}: Props): ReactElement => {
  const intl = useIntl()
  const [show, setShow] = useState(false)

  const toggle = (): void => {
    setShow(!show)
  }

  const handleClose = (): void => {
    if (onClose) onClose()
    setShow(false)
  }

  const formik = useFormik({
    initialValues: {
      search: '',
      fields: [],
      ...initialValues
    },
    onSubmit: (values) => {
      if (onSubmit) {
        // TODO: Revertir este cambio cuando los filtros sean OR y no AND
        onSubmit({ search: values.search, fields: [values.fields] })
      }
      if (handleClose) {
        handleClose()
      }
    }
  })

  const total = values?.fields.length ?? 0

  useEffect(() => {
    if (show && values) {
      formik.resetForm({
        values: values ?? { search: '', fields: [] }
      })
    }
  }, [show, values])

  const disabled =
    disabledEmpty &&
    !Object.values(formik.values).filter((item) => item !== null).length

  return (
    <Popover className="relative inline-block">
      <Float
        show={show}
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
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-4 pt-4 flex justify-between">
              <span>{intl.formatMessage(generalMessages.filters)}</span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    formik.resetForm({ values: { search: '', fields: [] } })
                    if (onReset) onReset()
                  }}
                  className="text-sm text-blue-500"
                >
                  {intl.formatMessage(actionsMessages.clean)}
                </button>
                <div className="border border-gray-400 rounded-lg h-3"></div>
                <button
                  disabled={disabled}
                  className="text-sm text-blue-500"
                  onClick={() => formik.handleSubmit()}
                >
                  {acceptText ?? intl.formatMessage(actionsMessages.accept)}
                </button>
              </div>
            </div>

            <div className="p-4">
              <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField
                  id="search"
                  name="search"
                  onChange={formik.handleChange}
                  value={formik.values.search}
                />

                <p className="mt-3 mb-2">Campos</p>
                <div className="flex flex-col gap-1">
                  {items.map((item, index) => (
                    // TODO: Revertir este cambio cuando los filtros sean OR y no AND
                    <Radio
                      label={item.label}
                      key={index}
                      name="fields"
                      id={`fields-${item.name}`}
                      onChange={formik.handleChange}
                      value={item.name}
                      checked={formik.values.fields.includes(item.name)}
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

import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'

import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { FunnelIcon } from '@heroicons/react/24/outline'

import Divider from 'components/Divider'
import { actionsMessages, generalMessages } from 'globalMessages'

import Field from './Field'
import Button from 'components/Button'

export type InputType =
  | 'datepicker'
  | 'select'
  | 'text'
  | 'autocomplete'
  | 'checkbox'
  | 'radio'
  | 'divider'
  | 'asyncSelect'

type InitialValues = Record<string, any>
type InputProps = Record<string, any>
export interface FilterItem {
  title: string
  description?: string
  type: InputType
  name: string
  items?: any[]
  options?: any[]
  props?: InputProps
  wrap?: boolean
  cancelItems?: string[]
  asyncSearch?: {
    loadOptions: (search: any, loadedOptions: any) => Promise<any>
    resetPagination: () => void
  }
}

interface Props {
  items: FilterItem[]
  onSubmit: (values: any) => any
  onReset?: () => void
  onClose?: () => void
  initialValues?: InitialValues
  values?: Record<string, any>
  children?: ReactNode
  acceptText?: ReactNode
  cancelText?: ReactNode
  disabledEmpty?: boolean
}

const Filter = ({
  items,
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
    initialValues: initialValues ?? {},
    onSubmit: (values) => {
      onSubmit(values)
      handleClose()
    }
  })

  useEffect(() => {
    if (show && values) {
      formik.resetForm({ values: values ?? {} })
    }
  }, [show, values])

  useEffect(() => {
    if (!show) {
      items.forEach((item) => {
        if (item.type === 'asyncSelect') {
          item.asyncSearch?.resetPagination()
        }
      })
    }
  }, [show])

  const disabled =
    disabledEmpty &&
    !Object.values(formik.values).filter((item) => item !== null).length

  return (
    <Popover className="relative inline-block">
      <Float
        show={show}
        placement="bottom-start"
        offset={15}
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
        <Popover.Button as="div" onClick={toggle}>
          {!children && (
            <button className="inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
              <span>{intl.formatMessage(generalMessages.filters)}</span>
              <FunnelIcon className="w-5 h-5 ml-2" />
            </button>
          )}
          {children && children}
        </Popover.Button>
        <Popover.Panel
          static
          className="bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-10 w-72"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-4 pt-4 flex justify-between">
              <span>{intl.formatMessage(generalMessages.filters)}</span>
              <button
                onClick={() => {
                  formik.resetForm({ values: {} })
                  if (onReset) onReset()
                }}
                className="text-sm text-blue-500"
              >
                {intl.formatMessage(actionsMessages.clean)}
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative grid gap-2 bg-white py-4 px-3">
                {items.map((item, index) =>
                  item.type === 'divider' ? (
                    <Divider key={index} margin="none" title={item.name} />
                  ) : (
                    <Field field={item} formik={formik} key={index} />
                  )
                )}
              </div>
              <div className="flex flex-column sm:flex-row-reverse gap-2 px-3 pb-3">
                <Button
                  type="submit"
                  disabled={disabled}
                  color="blue"
                  variant="contained"
                  className="inline-block mt-4 flex-1"
                >
                  {acceptText ?? intl.formatMessage(actionsMessages.accept)}
                </Button>

                <Button
                  onClick={handleClose}
                  type="button"
                  color="blue"
                  className="inline-block mt-4 flex-1"
                >
                  {cancelText ?? intl.formatMessage(actionsMessages.cancel)}
                </Button>
              </div>
            </form>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default Filter

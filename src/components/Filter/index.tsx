import { ReactElement, ReactNode, useState } from 'react'
import { useFormik } from 'formik'

import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { FunnelIcon } from '@heroicons/react/24/outline'

import Field from './Field'
// import clsx from 'clsx'

export type InputType =
  | 'datepicker'
  | 'select'
  | 'text'
  | 'autocomplete'
  | 'checkbox'
  | 'radio'

type InitialValues = Record<string, any>
type InputProps = Record<string, any>
interface Item {
  title: string
  description?: string
  type: InputType
  name: string
  items?: any[]
  options?: any[]
  props?: InputProps
  wrap?: boolean
  cancelItems?: string[]
}

interface Props {
  items: Item[]
  onSubmit: (values: any) => any
  onReset?: () => void
  initialValues?: InitialValues
  children?: ReactNode
  acceptText?: ReactNode
  cancelText?: ReactNode
}

const Filter = ({
  items,
  onSubmit,
  onReset,
  initialValues,
  children,
  acceptText = 'Aceptar',
  cancelText = 'Cancelar'
}: Props): ReactElement => {
  const [show, setShow] = useState(false)
  const toggle = (): void => {
    setShow(!show)
  }
  const handleClose = (): void => {
    setShow(false)
  }

  const formik = useFormik({
    initialValues: initialValues ?? {},
    onSubmit: (values) => {
      onSubmit(values)
      handleClose()
    }
  })

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
              <span>Filter</span> <FunnelIcon className="w-5 h-5 ml-2" />
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
              <span>Filters</span>
              <button
                onClick={() => {
                  formik.resetForm()
                  if (onReset) onReset()
                }}
                className="text-sm text-blue-500"
              >
                Limpiar
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative grid gap-2 bg-white py-4 px-3">
                {items.map((item, index) => (
                  <Field field={item} formik={formik} key={index} />
                ))}
              </div>
              <div className="flex flex-column sm:flex-row-reverse gap-2 px-3 pb-3">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {acceptText}
                </button>

                <button
                  onClick={handleClose}
                  type="button"
                  className="inline-block mt-4 text-center text-sm text-blue-500 md:mt-0 md:mx-6 dark:text-blue-400"
                >
                  {cancelText}
                </button>
              </div>
            </form>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default Filter

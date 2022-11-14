import { ReactElement, ReactNode, useCallback } from 'react'
import { FormikProps } from 'formik'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import TextField from 'components/Form/Textfield'
import Datepicker from 'components/Form/Datepicker'
import SelectField from 'components/Form/Select'
import Autocomplete from 'components/Form/Autocomplete'

interface Props {
  field: any
  formik: FormikProps<any>
}
interface WrapperProps {
  children: ReactNode
  wrap?: boolean
}
const Field = ({ field, formik }: Props): ReactElement => {
  const name: string = field.name
  const value: any = formik.values[name] ?? ''

  const Wrapper = useCallback(
    ({ children, wrap }: WrapperProps) => {
      if (wrap) {
        return (
          <Disclosure>
            {({ open }) => (
              <div>
                <Disclosure.Button className="flex w-full justify-between items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {field.title}
                    </p>
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-blue-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="p-2 text-sm text-gray-500">
                  {children}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        )
      }

      return <>{children}</>
    },
    [field]
  )
  const handleChange = (value: any): void => {
    formik.setFieldValue(name, value)

    if (field.cancelItems) {
      field.cancelItems.forEach((cancelField) => {
        formik.setFieldValue(cancelField, '')
      })
    }
  }

  switch (field.type) {
    case 'text':
      return (
        <Wrapper wrap={field.wrap ?? true}>
          <TextField
            {...field.props}
            id={name}
            value={value}
            onChange={(e: any) => handleChange(e.target.value)}
          />
        </Wrapper>
      )
    case 'datepicker':
      return (
        <Wrapper wrap={field.wrap ?? true}>
          <Datepicker {...field.props} value={value} onChange={handleChange} />
        </Wrapper>
      )
    case 'select':
      return (
        <Wrapper wrap={field.wrap ?? true}>
          <SelectField
            {...field.props}
            value={value}
            onChange={handleChange}
            items={field.items ?? []}
          />
        </Wrapper>
      )
    case 'autocomplete':
      return (
        <Wrapper wrap={field.wrap ?? true}>
          <Autocomplete
            {...field.props}
            value={value}
            onChange={handleChange}
            items={field.items ?? []}
          />
        </Wrapper>
      )
    case 'checkbox':
      if (field.items) {
        return (
          <Wrapper wrap={field.wrap ?? true}>
            <fieldset className="space-y-6">
              {field.items.map((item: any, index: number) => (
                <div
                  key={`${name}-checkbox-${index}`}
                  className="inline-flex w-full items-start space-x-1.5"
                >
                  <input
                    type="checkbox"
                    id={`${name}-checkbox-${index}`}
                    name={name}
                    value={item.value}
                    onChange={formik.handleChange}
                    className="cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                  />
                  <label
                    htmlFor={`${name}-checkbox-${index}`}
                    className="flex cursor-pointer flex-col space-y-1 w-full truncate whitespace-normal text-xs"
                  >
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                    <span className="text-gray-500">{item.description}</span>
                  </label>
                </div>
              ))}
            </fieldset>
          </Wrapper>
        )
      }

      return (
        <Wrapper>
          <div className="flex w-full justify-between items-center gap-2 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
            <label
              htmlFor={field.name}
              className="inline-flex w-full items-start cursor-pointer flex-col space-y-1 truncate whitespace-normal"
            >
              <span className="text-sm font-medium text-gray-900">
                {field.title}
              </span>
              <span className="text-xs text-gray-500">{field.description}</span>
            </label>

            <input
              id={field.name}
              type="checkbox"
              checked={!!value}
              onChange={(e: any) => {
                handleChange(e.target.checked)
              }}
              className="cursor-pointer rounded border-gray-300 text-blue-600 transition focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
            />
          </div>
        </Wrapper>
      )
    case 'radio':
      return (
        <Wrapper wrap={field.wrap ?? true}>
          <fieldset className="space-y-6">
            {field.items.map((item: any, index: number) => (
              <div
                key={`${name}-radio-${index}`}
                className="inline-flex w-full items-start space-x-1.5"
              >
                <input
                  type="radio"
                  id={`${name}-radio-${index}`}
                  name={name}
                  value={item.value}
                  checked={value === item.value}
                  onChange={() => handleChange(item.value)}
                  className="cursor-pointer rounded-full border-gray-300 text-blue-600 transition focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                />
                <label
                  htmlFor={`${name}-radio-${index}`}
                  className="flex cursor-pointer flex-col space-y-1 w-full truncate whitespace-normal text-xs"
                >
                  <span className="font-medium text-gray-900">
                    {item.label}
                  </span>
                  <span className="text-gray-500">{item.description}</span>
                </label>
              </div>
            ))}
          </fieldset>
        </Wrapper>
      )
    default:
      return <></>
  }
}

export default Field

import { ReactElement } from 'react'
import { FormikProps } from 'formik'
import { useIntl } from 'react-intl'

import Button from 'components/Button'

import { actionsMessages, formMessages } from 'messages'

import { FormValues } from '../index'

interface Props {
  formik: FormikProps<FormValues>
}

const Request = ({ formik }: Props): ReactElement => {
  const intl = useIntl()

  return (
    <div className="text-center pt-10 pb-5">
      <div>
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Información del solicitante
            </h3>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {intl.formatMessage(formMessages.name)}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {formik.values.name}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {intl.formatMessage(formMessages.lastname)}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {formik.values.lastname}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {intl.formatMessage(formMessages.secondLastname)}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {formik.values.secondLastname}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {intl.formatMessage(formMessages.email)}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {formik.values.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <form onSubmit={formik.handleSubmit}>
          <Button
            type="submit"
            variant="contained"
            className="w-full bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500"
          >
            <span>{intl.formatMessage(actionsMessages.requestAccess)}</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Request

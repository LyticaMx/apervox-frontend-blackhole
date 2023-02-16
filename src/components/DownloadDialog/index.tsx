import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import Form from 'components/Form'
import Grid from 'components/Grid'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages } from 'globalMessages'
import { ReactElement, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { DocumentType } from 'types/utils'

interface FormValues {
  documentType: DocumentType
}

interface Props {
  onExport:
    | ((documentType: DocumentType) => Promise<void>)
    | ((documentType: DocumentType) => Promise<boolean>)
    | ((documentType: DocumentType) => void)
}

const DownloadDialog = (props: Props): ReactElement => {
  const [show, setShow] = useState<boolean>(false)
  const formRef = useRef<FormikContextType<FormValues>>()
  const { formatMessage } = useIntl()
  const toggle = (): void => setShow(!show)

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: { documentType: 'xls' },
    onSubmit: async (values) => {
      await props.onExport(values.documentType)
      setShow(false)
    }
  }

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
        <Popover.Group>
          <Tooltip
            content={formatMessage(actionsMessages.export)}
            floatProps={{ offset: 10, arrow: true }}
            classNames={{
              panel:
                'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
              arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
            }}
            placement="top"
          >
            <Popover.Button
              className="gap-2 btn shadow-blackhole-md p-1.5 py-2.5 text-secondary-gray hover:text-primary"
              onClick={toggle}
            >
              <ArrowDownOnSquareIcon className="w-5 h-5 " />
            </Popover.Button>
          </Tooltip>
        </Popover.Group>
        <Popover.Panel
          static
          className="bg-white border border-gray-100 rounded-md shadow-lg focus:outline-none z-10 w-72"
        >
          <Grid className="p-4" spacing={2}>
            <Grid item xs={12} sm={5}>
              <Typography
                style="bold"
                className="text-secondary text-lg bold uppercase"
              >
                {formatMessage(actionsMessages.export)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7} className="flex max-h-6 items-start">
              <button
                className="text-primary mr-2 flex-none"
                onClick={() => formRef.current?.resetForm()}
                type="button"
              >
                {formatMessage(actionsMessages.clean)}
              </button>
              <div className="w-1 inline h-6 bg-[#00000029] rounded-md" />
              <button
                className="text-primary ml-2"
                onClick={() => formRef.current?.submitForm()}
                type="submit"
              >
                {formatMessage(actionsMessages.export)}
              </button>
            </Grid>
            <Grid item>
              <Form
                formikConfig={formikConfig}
                fields={[
                  {
                    type: 'radio',
                    name: 'documentType',
                    options: {
                      label: 'XLS',
                      value: 'xls'
                    }
                  },
                  {
                    type: 'radio',
                    name: 'documentType',
                    options: {
                      label: 'CSV',
                      value: 'csv'
                    }
                  },
                  {
                    type: 'radio',
                    name: 'documentType',
                    options: {
                      label: 'PDF',
                      value: 'pdf'
                    }
                  }
                ]}
                renderSubmitButton={false}
                formikRef={formRef}
              />
            </Grid>
          </Grid>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default DownloadDialog

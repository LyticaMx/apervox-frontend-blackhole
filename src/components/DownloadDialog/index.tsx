import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import Form from 'components/Form'
import Grid from 'components/Grid'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import { FormikConfig, FormikContextType } from 'formik'
import { actionsMessages } from 'globalMessages'
import { useAutoCloseDialog } from 'hooks/useAutoCloseDialog'
import useSections from 'hooks/useSections'
import { ReactElement, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { DocumentType, RowsQuantity } from 'types/utils'
import { messages } from './messages'

interface FormValues {
  documentType: DocumentType
  fullData: RowsQuantity
}

interface Props {
  onExport:
    | ((documentType: DocumentType, quantity: RowsQuantity) => Promise<void>)
    | ((documentType: DocumentType, quantity: RowsQuantity) => Promise<boolean>)
    | ((documentType: DocumentType, quantity: RowsQuantity) => void)
}

const DownloadDialog = (props: Props): ReactElement => {
  const { open: show, popoverRef, setOpen: setShow } = useAutoCloseDialog()
  const formRef = useRef<FormikContextType<FormValues>>()
  const { formatMessage } = useIntl()
  const toggle = (): void => setShow(!show)

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: { documentType: 'excel', fullData: 'page' },
    onSubmit: async (values) => {
      await props.onExport(values.documentType, values.fullData)
      setShow(false)
    }
  }

  useEffect(() => {
    if (!show) return
    const handleClickOutside = (event): void => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [show])

  const sections = useSections(() => [
    {
      name: 'type',
      title: {
        text: formatMessage(messages.documentType)
      },
      removeSeparator: true
    },
    {
      name: 'quantity',
      title: { text: formatMessage(messages.rows) },
      removeSeparator: true
    }
  ])

  return (
    <Popover className="relative inline-block">
      <Float
        zIndex={99} // Indice menor al loader
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
          unmount
          className="bg-white border border-gray-100 rounded-md shadow-lg focus:outline-none z-10 w-72"
        >
          <div ref={popoverRef}>
            <Grid className="p-4" spacing={2}>
              <Grid item xs={12} sm={5}>
                <Typography
                  style="bold"
                  className="text-secondary text-lg bold uppercase"
                >
                  {formatMessage(actionsMessages.export)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                className="flex max-h-6 items-center justify-end"
              >
                <button
                  className="text-primary mr-2 flex-none text-sm"
                  onClick={() => formRef.current?.resetForm()}
                  type="button"
                >
                  {formatMessage(actionsMessages.clean)}
                </button>
                <div className="border border-gray-400 rounded-lg h-3" />
                <button
                  className="text-primary ml-2 text-sm"
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
                        label: 'Excel',
                        value: 'excel'
                      },
                      section: 'type'
                    },
                    {
                      type: 'radio',
                      name: 'documentType',
                      options: {
                        label: 'CSV',
                        value: 'csv'
                      },
                      section: 'type'
                    },
                    /* Deshabilitado temporalmente
                    {
                      type: 'radio',
                      name: 'documentType',
                      options: {
                        label: 'PDF',
                        value: 'pdf'
                      }
                    }
                    */
                    {
                      type: 'radio',
                      name: 'fullData',
                      options: {
                        label: formatMessage(messages.actualPage),
                        className: 'w-24',
                        value: 'page'
                      },
                      section: 'quantity'
                    },
                    {
                      type: 'radio',
                      name: 'fullData',
                      options: {
                        label: formatMessage(messages.allRows),
                        value: 'full'
                      },
                      section: 'quantity'
                    }
                  ]}
                  withSections={{ sections }}
                  renderSubmitButton={false}
                  formikRef={formRef}
                />
              </Grid>
            </Grid>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default DownloadDialog

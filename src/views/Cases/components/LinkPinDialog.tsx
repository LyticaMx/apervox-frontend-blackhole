import { ReactElement, useEffect } from 'react'
import Dialog from 'components/Dialog'
import { PlusIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import Button from 'components/Button'
import { useIntl } from 'react-intl'
import { linkPinDialogMessages } from '../messages'
import { actionsMessages } from 'globalMessages'
import { useCases } from 'context/Cases'
import Label from 'components/Label'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useAsyncSelect } from 'hooks/useAsyncSelect'
import { useFormik } from 'formik'

interface Props {
  open: boolean
  onClose: () => void
}

interface FormValues {
  pin: any
}

const LinkPinDialog = (props: Props): ReactElement => {
  const { open, onClose } = props
  const { formatMessage } = useIntl()
  const { caseDetail, actions } = useCases()
  const { loadOptions, resetPaginate } = useAsyncSelect({
    api: {
      endpoint: 'pins',
      method: 'get'
    },
    value: 'id',
    label: 'number',
    extraParams: {
      only_available: false
    }
  })
  const formik = useFormik<FormValues>({
    initialValues: {
      pin: null
    },
    onSubmit: async (values) => {
      const { pin } = values
      const updated = await actions?.linkPin(pin.value)
      if (updated) onClose()
    }
  })

  useEffect(() => {
    if (open) formik.resetForm()
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <div className="mb-5 px-4 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <Typography variant="title" style="semibold">
            {formatMessage(linkPinDialogMessages.linkPin)}
          </Typography>
          <Typography variant="body2">
            {formatMessage(linkPinDialogMessages.addPin, {
              caseName: caseDetail?.name
            })}
          </Typography>
          <form
            className="w-full mt-4"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <div className="text-left w-full">
              <Label id="pin">PIN</Label>
              <AsyncPaginate
                value={formik.values.pin}
                loadOptions={loadOptions}
                onMenuClose={resetPaginate}
                onChange={async (value) =>
                  await formik.setFieldValue('pin', value)
                }
                placeholder={formatMessage(
                  linkPinDialogMessages.linkPinPlaceholder
                )}
              />
            </div>
            <Button
              type="submit"
              color="indigo"
              variant="contained"
              className="mx-auto mt-6 !w-60"
              disabled={!formik.values.pin}
            >
              {formatMessage(actionsMessages.link)}
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default LinkPinDialog

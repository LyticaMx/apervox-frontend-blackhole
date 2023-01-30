import { ReactElement, useEffect } from 'react'
import Dialog from 'components/Dialog'
import { PlusIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'

import Button from 'components/Button'
import { useIntl } from 'react-intl'
import { actionsMessages, generalMessages } from 'globalMessages'
import { linkUserDialogMessages } from '../messages'
import { useCases } from 'context/Cases'
import { useAsyncSelect } from 'hooks/useAsyncSelect'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useFormik } from 'formik'
import Label from 'components/Label'

interface Props {
  open: boolean
  onClose: () => void
}

interface FormValues {
  user: any
}

const LinkUserDialog = (props: Props): ReactElement => {
  const { open, onClose } = props
  const { formatMessage } = useIntl()
  const { caseDetail, actions } = useCases()

  const { loadOptions, resetPaginate } = useAsyncSelect({
    api: {
      endpoint: 'users/get-all-users',
      method: 'get'
    },
    value: 'id',
    customLabel: (item) =>
      `${String(item.profile.first_name)} ${String(item.profile.fathers_name)}`
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      user: null
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { user } = values
      const updated = await actions?.linkUser(user.value)
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
            {formatMessage(generalMessages.user)}
          </Typography>
          <Typography variant="body2">
            {formatMessage(linkUserDialogMessages.linkUser, {
              caseName: caseDetail?.name
            })}
          </Typography>
          <form
            className="w-full mt-4"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <div className="text-left w-full">
              <Label id="user">{formatMessage(generalMessages.user)}</Label>
              <AsyncPaginate
                value={formik.values.user}
                loadOptions={loadOptions}
                onMenuClose={resetPaginate}
                onChange={async (value) =>
                  await formik.setFieldValue('user', value)
                }
                placeholder={formatMessage(
                  linkUserDialogMessages.linkUserPlaceholder
                )}
              />
            </div>
            <Button
              color="indigo"
              variant="contained"
              className="mx-auto mt-6 !w-60"
              disabled={!formik.values.user}
              type="submit"
            >
              {formatMessage(actionsMessages.link)}
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default LinkUserDialog

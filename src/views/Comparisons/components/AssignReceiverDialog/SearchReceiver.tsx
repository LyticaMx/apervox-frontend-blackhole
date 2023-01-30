import Typography from 'components/Typography'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import {
  CalendarDaysIcon,
  IdentificationIcon,
  PhoneIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import Divider from 'components/Divider'
import { assignReceiverDialogMessages } from '../../messages'
import { Receiver } from '../../ReceiverToReceiver'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { actionsMessages, formMessages } from 'globalMessages'
import Button from 'components/Button'
import { useAsyncSelect } from 'hooks/useAsyncSelect'
import { AsyncPaginate } from 'react-select-async-paginate'

interface Props {
  audioToLink: Receiver | null
  changeTab: () => void
  onClose: () => void
}

interface FormValues {
  receiver: string
}

const SearchReceiver = (props: Props): ReactElement => {
  const { audioToLink, changeTab, onClose } = props
  const { formatMessage } = useIntl()
  const [speaker, setSpeaker] = useState<any>(null)
  const { loadOptions, resetPaginate } = useAsyncSelect({
    api: {
      endpoint: 'receptors',
      method: 'get'
    },
    value: 'id',
    customLabel: (item) =>
      `${item.names} ${item.fathers_name} ${item.mothers_name}`
  })

  const validationSchema = yup.object({
    receiver: yup.string().required(formatMessage(formMessages.required))
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      receiver: ''
    },
    onSubmit: (values) => {
      console.log(values)
      onClose()
    },
    validationSchema
  })

  return (
    <form
      className="py-3"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <Typography className="text-center mb-3" style="semibold">
        {formatMessage(assignReceiverDialogMessages.assignReceiver)}
      </Typography>
      <Typography variant="caption" className="text-center text-gray-500 mb-3">
        {formatMessage(assignReceiverDialogMessages.advertisement)}
      </Typography>
      <div className="ml-4 border-l-2 border-violet-600 pl-2 py-2">
        <Typography variant="subtitle" style="semibold">
          {audioToLink?.name}
        </Typography>
        <div className="flex items-center mt-2">
          <IdentificationIcon className="w-5 h-5" />
          <Typography className="ml-3" variant="caption">
            {formatMessage(assignReceiverDialogMessages.pinNumber, {
              pin: <span className="font-semibold">{audioToLink?.pin}</span>
            })}
          </Typography>
        </div>
        <div className="flex items-center mt-2">
          <PhoneIcon className="w-5 h-5" />
          <Typography className="ml-3" variant="caption">
            {formatMessage(assignReceiverDialogMessages.receiverNumber, {
              receiverNumber: audioToLink?.receiverPhone
            })}
          </Typography>
        </div>
        <div className="flex items-center mt-2">
          <CalendarDaysIcon className="w-5 h-5" />
          <Typography className="ml-3" variant="caption">
            {formatMessage(assignReceiverDialogMessages.wasDone, {
              date: audioToLink?.date
            })}
          </Typography>
        </div>
      </div>
      <Divider />
      <div>
        <AsyncPaginate
          id="receiver"
          name="receiver"
          onBlur={formik.handleBlur}
          value={speaker}
          onChange={async (selected) => {
            setSpeaker(selected)
            await formik.setFieldValue('receiver', selected.value)
          }}
          loadOptions={loadOptions}
          onMenuClose={resetPaginate}
          placeholder={formatMessage(
            assignReceiverDialogMessages.selectReceiver
          )}
          classNames={{
            control: () =>
              formik.errors.receiver && formik.touched.receiver
                ? '!border-red-500'
                : ''
          }}
        />
        {formik.errors.receiver && formik.touched.receiver ? (
          <span className="text-xs text-red-500">{formik.errors.receiver}</span>
        ) : (
          ''
        )}
      </div>
      <button
        className="text-blue-500 text-sm flex items-center my-2"
        onClick={changeTab}
      >
        <UserPlusIcon className="w-3 h-3" />{' '}
        <span className="text-xs ml-2">
          {formatMessage(assignReceiverDialogMessages.createReceiverLink)}
        </span>
      </button>
      <Button variant="contained" color="blue" fullwidth type="submit">
        {formatMessage(actionsMessages.assign)}
      </Button>
    </form>
  )
}

export default SearchReceiver

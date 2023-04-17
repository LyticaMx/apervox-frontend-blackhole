import { ReactElement, useState } from 'react'
import { useFormik } from 'formik'
import { AsyncPaginate } from 'react-select-async-paginate'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import useApi from 'hooks/useApi'
import { PaginationFilter } from 'types/filters'
import Button from 'components/Button'
import Typography from 'components/Typography'
import { Speaker } from 'types/speaker'
import { PaginateSelectItem } from './PinSection'
import { useIntl } from 'react-intl'
import { pinsMessages } from '../messages'
import { actionsMessages } from 'globalMessages'

interface Props {
  pinToLink: PaginateSelectItem | null
  onAccept: (pin: string, speaker: string) => void
  onCancel: () => void
}

interface PinFilters extends PaginationFilter {
  only_available: boolean
}

interface SpeakerFilters extends PaginationFilter {
  assigned?: boolean
}

interface FormValues {
  pin: PaginateSelectItem | null
  speaker: PaginateSelectItem | null
}

const AssignSpeaker = ({
  pinToLink,
  onAccept,
  onCancel
}: Props): ReactElement => {
  const [pinFilters, setPinFilters] = useState<PinFilters>({
    limit: 20,
    page: 1,
    only_available: true
  })

  const [speakerFilters, setSpeakerFilters] = useState<SpeakerFilters>({
    limit: 20,
    page: 1,
    assigned: false
  })

  const initialValues: FormValues = {
    speaker: null,
    pin: pinToLink ?? null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (formValues) => {
      onAccept(formValues.pin?.value, formValues?.speaker?.value)
    }
  })

  const getPinsService = useApi({
    endpoint: 'pins',
    method: 'get'
  })

  const getSpeakersService = useApi({
    endpoint: 'speakers',
    method: 'get'
  })

  const { formatMessage } = useIntl()

  const loadPinOptions = async (): Promise<any> => {
    const res = await getPinsService({ urlParams: pinFilters })

    if (res) {
      setPinFilters((prev) => ({ ...prev, page: prev.page + 1 }))
    }

    return {
      options: res?.data.map((pin) => ({ value: pin.id, label: pin.number })),
      hasMore: false
    }
  }

  const loadSpeakerOptions = async (): Promise<any> => {
    const res = await getSpeakersService({ urlParams: speakerFilters })

    if (res.data) {
      setSpeakerFilters((prev) => ({ ...prev, page: prev.page + 1 }))

      return {
        options: res?.data.map((speaker: Speaker) => ({
          value: speaker.id,
          label: `${speaker.names} ${speaker.fathers_name} ${speaker.mothers_name}`
        })),
        hasMore: false
      }
    }

    return {
      options: [],
      hasMore: false
    }
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex p-4">
          <div className="w-1/6">
            <div className="w-14 h-14 p-2 bg-slate-500 rounded-full flex justify-center items-center">
              <ExclamationTriangleIcon className="w-full h-full text-white" />
            </div>
          </div>
          <div className="h-5/6">
            <Typography className="text-lg font-semibold" style="semibold">
              {formatMessage(pinsMessages.linkPin)}
            </Typography>
            <Typography className="text-slate-700">
              {formatMessage(pinsMessages.selectSpeakerToLink)}
            </Typography>
            <div className="mt-4">
              <AsyncPaginate
                isDisabled={Boolean(pinToLink)}
                isSearchable={false}
                id="pins"
                value={formik.values.pin}
                loadOptions={loadPinOptions}
                onChange={async (value) => {
                  await formik.setFieldValue('pin', value)
                }}
                placeholder={formatMessage(pinsMessages.selectPin)}
              />
            </div>
            <div className="mt-4">
              {/* <SelectField placeholder="Seleccione un hablante" /> */}
              <AsyncPaginate
                isSearchable={false}
                id="speakers"
                value={formik.values.speaker}
                loadOptions={loadSpeakerOptions}
                onChange={async (value) => {
                  await formik.setFieldValue('speaker', value)
                }}
                placeholder={formatMessage(pinsMessages.selectSpeaker)}
              />
            </div>
          </div>
        </div>
        <div className="flex bg-slate-100 justify-evenly py-2">
          <Button margin="none" color="red" onClick={onCancel}>
            {formatMessage(actionsMessages.cancel)}
          </Button>
          <Button
            margin="none"
            variant="contained"
            type="submit"
            disabled={!formik.values.pin || !formik.values.speaker}
          >
            {formatMessage(actionsMessages.confirm)}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AssignSpeaker

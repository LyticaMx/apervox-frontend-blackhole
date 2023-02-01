import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { FormikErrors, useFormik } from 'formik'
import { AsyncPaginate } from 'react-select-async-paginate'

import Dialog from 'components/Dialog'
import SelectField from 'components/Form/Select'
import TextField from 'components/Form/Textfield'

import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { PaginationFilter } from 'types/filters'
import useApi from 'hooks/useApi'
import Label from 'components/Label'
import Button from 'components/Button'
import { useDirectory } from 'context/Directory'

interface Props {
  openForm: boolean
  onClose: () => void
}

interface FormikValues {
  names: string
  fathers_name: string
  mothers_name: string
  age: number
  gender: 'MALE' | 'FEMALE'
  location_id: SelectPaginateItem
  penitentiary_id: SelectPaginateItem
  pin_id: SelectPaginateItem
}

interface PinFilters extends PaginationFilter {
  only_available: boolean
}

interface SelectPaginateItem {
  value: string
  label: string
}

const CreateSpeaker = ({ openForm, onClose }: Props): ReactElement => {
  const intl = useIntl()
  const { actions } = useDirectory()

  const getPenitentiariesService = useApi({
    endpoint: '/penitentiaries',
    method: 'get'
  })

  const getLocationsService = useApi({
    endpoint: 'locations',
    method: 'get'
  })

  const getPinsService = useApi({
    endpoint: 'pins',
    method: 'get'
  })

  const [locationFilters, setLocationFilters] = useState<PaginationFilter>({
    limit: 30,
    page: 1
  })
  const [penitentiaryFilters, setPenitentiaryFilters] =
    useState<PaginationFilter>({
      limit: 30,
      page: 1
    })
  const [pinFilters, setPinFilters] = useState<PinFilters>({
    limit: 30,
    page: 1,
    only_available: true
  })

  const validate = (values: FormikValues): FormikErrors<FormikValues> => {
    const errors: FormikErrors<FormikValues> = {}

    return errors
  }

  const formik = useFormik<FormikValues>({
    initialValues: {
      names: '',
      fathers_name: '',
      mothers_name: '',
      age: 18,
      gender: 'MALE',
      location_id: { label: '', value: '' },
      penitentiary_id: { label: '', value: '63a9ff100f0fc123e90de7d7' },
      pin_id: { label: '', value: '' }
    },
    validate,
    onSubmit: async (values) => {
      const speaker = {
        ...values,
        location_id: values.location_id.value,
        penitentiary_id: values.penitentiary_id.value,
        pin_id: values.pin_id.value
      }
      const created = await actions?.createSpeaker(speaker)

      if (created) {
        actions?.getSpeakerList()
      }
    }
  })

  const loadLocationOptions = async (): Promise<any> => {
    const res = await getLocationsService({ urlParams: locationFilters })

    if (res.data) {
      setLocationFilters((prev) => ({ ...prev, page: prev.page + 1 }))
    }

    return {
      options: res?.data.map((location) => ({
        value: location.id,
        label: location.name
      })),
      hasMore: res?.page_info.has_next_page
    }
  }

  const loadPenitentiaryOptions = async (): Promise<any> => {
    const res = await getPenitentiariesService({
      urlParams: penitentiaryFilters
    })

    if (res.data) {
      setPenitentiaryFilters((prev) => ({ ...prev, page: prev.page + 1 }))
    }

    return {
      options: res?.data.map((penitentiary) => ({
        value: penitentiary.id,
        label: penitentiary.name
      })),
      hasMore: res?.page_info.has_next_page
    }
  }

  const loadPinOptions = async (): Promise<any> => {
    const res = await getPinsService({
      urlParams: pinFilters
    })

    if (res.data) {
      setPinFilters((prev) => ({ ...prev, page: prev.page + 1 }))
    }

    return {
      options: res?.data.map((pin) => ({
        value: pin.id,
        label: pin.number
      })),
      hasMore: res?.page_info.has_next_page
    }
  }

  return (
    <Dialog open={openForm} onClose={onClose} size="xl" overflow="visible">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <Label id="penitentiary" labelSpacing="1">
              PIN
            </Label>
            <AsyncPaginate
              value={formik.values.pin_id}
              loadOptions={loadPinOptions}
              onChange={(value): void => {
                formik.setFieldValue('pin_id', value)
              }}
            />
          </div>
          <div className="col-span-6">
            <TextField
              id="names"
              name="names"
              labelSpacing="1"
              label={intl.formatMessage(formMessages.names)}
              onChange={formik.handleChange}
              value={formik.values.names}
            />
          </div>
          <div className="col-span-6">
            <TextField
              id="fathers_name"
              name="fathers_name"
              labelSpacing="1"
              label={intl.formatMessage(formMessages.lastname)}
              onChange={formik.handleChange}
              value={formik.values.fathers_name}
            />
          </div>
          <div className="col-span-6">
            <TextField
              id="mothers_name"
              name="mothers_name"
              labelSpacing="1"
              label={intl.formatMessage(formMessages.secondLastname)}
              onChange={formik.handleChange}
              value={formik.values.mothers_name}
            />
          </div>
          <div className="col-span-6">
            <TextField
              id="age"
              name="age"
              type="number"
              labelSpacing="1"
              label={intl.formatMessage(formMessages.age)}
              onChange={formik.handleChange}
              value={formik.values.age}
            />
          </div>
          <div className="col-span-6">
            <SelectField
              label={intl.formatMessage(generalMessages.gender)}
              value={formik.values.gender}
              onChange={(newValue): void => {
                formik.setFieldValue('gender', newValue)
              }}
              items={[
                {
                  value: 'MALE',
                  text: intl.formatMessage(generalMessages.male)
                },
                {
                  value: 'FEMALE',
                  text: intl.formatMessage(generalMessages.female)
                }
              ]}
            />
          </div>
          <div className="col-span-6">
            <Label id="location" labelSpacing="1">
              {intl.formatMessage(generalMessages.location)}
            </Label>
            <AsyncPaginate
              value={formik.values.location_id}
              loadOptions={loadLocationOptions}
              onChange={(value): void => {
                formik.setFieldValue('location_id', value)
              }}
            />
          </div>
          <div className="col-span-6">
            <Label id="penitentiary" labelSpacing="1">
              {intl.formatMessage(generalMessages.penitentiary)}
            </Label>
            <AsyncPaginate
              value={formik.values.penitentiary_id}
              loadOptions={loadPenitentiaryOptions}
              onChange={(value): void => {
                formik.setFieldValue('penitentiary_id', value)
              }}
            />
          </div>
        </div>
        <Button
          fullwidth
          variant="contained"
          color="sky"
          className="mt-5"
          margin="none"
          type="submit"
        >
          {intl.formatMessage(actionsMessages.add)}
        </Button>
      </form>
    </Dialog>
  )
}

export default CreateSpeaker

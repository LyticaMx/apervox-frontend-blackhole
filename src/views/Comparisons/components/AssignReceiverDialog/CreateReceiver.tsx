import Divider from 'components/Divider'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import { useFormik } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { assignReceiverDialogMessages } from 'views/Comparisons/messages'
import Button from 'components/Button'
import * as yup from 'yup'
import Label from 'components/Label'
import useApi from 'hooks/useApi'
import Radio from 'components/Form/Radio'
import Autocomplete from 'components/Form/Autocomplete'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

interface Location {
  id: string
  name: string
}

interface FormValues {
  name: string
  lastName: string
  mothersLastName: string
  age: string
  location: string
  locationQuery: string
  gender: 'MALE' | 'FEMALE'
}

interface Props {
  onClose: () => void
}

const CreateReceiver = (props: Props): ReactElement => {
  const { onClose } = props
  const [locations, setLocations] = useState<Location[]>([])
  const { formatMessage } = useIntl()
  const getLocationsService = useApi({
    endpoint: 'locations',
    method: 'get'
  })
  const createLocationService = useApi({
    endpoint: 'locations',
    method: 'post'
  })
  const createReceptorService = useApi({
    endpoint: 'receptors',
    method: 'post'
  })

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
    lastName: yup.string().required(formatMessage(formMessages.required)),
    mothersLastName: yup
      .string()
      .required(formatMessage(formMessages.required)),
    age: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required))
      .min(0, formatMessage(formMessages.minValue, { value: 0 }))
      .max(120, formatMessage(formMessages.maxValue, { value: 120 })),
    location: yup.string().required(formatMessage(formMessages.required))
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      lastName: '',
      mothersLastName: '',
      age: '',
      location: '',
      locationQuery: '',
      gender: 'MALE'
    },
    onSubmit: async (values) => {
      try {
        console.log(values)
        let x = 1
        x++

        if (x === 2) return

        const response = await createReceptorService({
          body: {
            names: values.name,
            fathers_name: values.lastName,
            mothers_name: values.mothersLastName,
            age: values.age,
            gender: values.gender,
            location_id: values.location
          }
        })
        console.log(response)

        onClose()
      } catch (e) {
        console.error(e)
      }
    },
    enableReinitialize: true,
    validationSchema
  })

  const fetchLocations = async (): Promise<void> => {
    try {
      const response = await getLocationsService({
        urlParams: {
          limit: 1000
        }
      })
      if (response.data) {
        setLocations(response.data)
      }
    } catch {}
  }

  const createLocation = async (name: string): Promise<void> => {
    try {
      const response = await createLocationService({
        body: {
          state_id: process.env.REACT_APP_LOCATION_STATE_ID,
          name
        }
      })
      if (response.data) {
        const newLocation = response.data
        setLocations(locations.concat([newLocation]))
        await formik.setFieldValue('location', newLocation.id)
      }
    } catch {}
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <div className="py-3">
      <Typography className="text-center mb-3" style="semibold">
        {formatMessage(assignReceiverDialogMessages.assignReceiver)}
      </Typography>
      <Typography variant="caption" className="text-center text-gray-500 mb-3">
        {formatMessage(assignReceiverDialogMessages.advertisement)}
      </Typography>
      <Divider />
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <TextField
          label={formatMessage(formMessages.names)}
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.name && formik.touched.name)}
          helperText={
            formik.errors.name && formik.touched.name ? formik.errors.name : ''
          }
        />
        <TextField
          label={formatMessage(formMessages.lastname)}
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.lastName && formik.touched.lastName)}
          helperText={
            formik.errors.lastName && formik.touched.lastName
              ? formik.errors.lastName
              : ''
          }
        />
        <TextField
          label={formatMessage(formMessages.secondLastname)}
          id="mothersLastName"
          name="mothersLastName"
          value={formik.values.mothersLastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.errors.mothersLastName && formik.touched.mothersLastName
          )}
          helperText={
            formik.errors.mothersLastName && formik.touched.mothersLastName
              ? formik.errors.mothersLastName
              : ''
          }
        />
        <TextField
          label={formatMessage(formMessages.age)}
          id="age"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.age && formik.touched.age)}
          helperText={
            formik.errors.age && formik.touched.age ? formik.errors.age : ''
          }
        />
        <div>
          <Label id="gender" labelSpacing="2">
            {formatMessage(formMessages.gender)}
          </Label>
          <div onChange={(e: any) => console.log(e.target.value)}>
            <Radio
              label={formatMessage(formMessages.male)}
              value="MALE"
              name="gender"
              checked={formik.values.gender === 'MALE'}
              onChange={formik.handleChange}
              className="mr-2"
            />
            <Radio
              label={formatMessage(formMessages.female)}
              value="FEMALE"
              name="gender"
              checked={formik.values.gender === 'FEMALE'}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div>
          <Autocomplete
            label={formatMessage(formMessages.location)}
            value={formik.values.location}
            items={locations}
            textField="name"
            valueField="id"
            onChange={async (val) =>
              await formik.setFieldValue('location', val)
            }
            onQueryChange={async (val) =>
              await formik.setFieldValue('locationQuery', val)
            }
            className={
              formik.errors.location && formik.touched.location
                ? '!border-red-500 !border-2'
                : ''
            }
            noFoundText={
              <button
                className="flex items-center"
                onClick={async () =>
                  await createLocation(formik.values.locationQuery)
                }
                type="button"
              >
                <PlusCircleIcon className="h-4 w-4 mr-3" />{' '}
                {`${formatMessage(actionsMessages.create)} ${
                  formik.values.locationQuery
                }`}
              </button>
            }
          />
          {formik.errors.location && formik.touched.location ? (
            <span className="text-xs text-red-500">
              {formik.errors.location}
            </span>
          ) : null}
        </div>
        <Button
          variant="contained"
          color="blue"
          className="mt-3"
          fullwidth
          type="submit"
        >
          {formatMessage(actionsMessages.add)}
        </Button>
      </form>
    </div>
  )
}

export default CreateReceiver

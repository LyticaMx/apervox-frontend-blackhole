import { ReactElement, useEffect, useMemo, useState } from 'react'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Form from 'components/Form'
import { Field, Section } from 'types/form'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import Typography from 'components/Typography'
import { useAddressForm, AddressFormValues } from './useAddressForm'
import {
  targetFormsGeneralMessages,
  personalDataFormMessages,
  targetFormMessages
} from 'views/Technique/messages'
import { useIntl } from 'react-intl'
import useTargetMeta from 'hooks/useTargetMeta'
import { useTechnique } from 'context/Technique'
import useToast from 'hooks/useToast'
import { format } from 'date-fns'

interface FormValues extends AddressFormValues {
  alias: string
  name: string
  targetNumber: string
  gender: string
  birthdate: string
  age: string
  curp: string
  rfc: string
  birthCountry: string
  birthState: string
  birthCity: string
}

const PersonalDataForm = (): ReactElement => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    alias: '',
    name: '',
    targetNumber: '',
    gender: '',
    birthdate: '',
    age: '',
    curp: '',
    rfc: '',
    birthCountry: '',
    birthState: '',
    birthCity: '',
    state: '',
    city: '',
    zipCode: '',
    country: '',
    line1: '',
    line2: ''
  })
  const getMessage = useFormatMessage(personalDataFormMessages)
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()
  const { addressFields, addressValidationSchema } =
    useAddressForm<FormValues>('address')
  const { target } = useTechnique()
  const actions = useTargetMeta(target?.id ?? '', 'personal-data')
  const { launchToast } = useToast()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'alias',
      options: {
        id: 'alias',
        label: getMessage('targetAlias'),
        placeholder: getMessage('targetAliasPlaceholder')
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'name',
      options: {
        id: 'personal-data-name',
        label: getMessage('targetName'),
        placeholder: getMessage('targetNamePlaceholder')
      },
      breakpoints: { xs: 6 }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        id: 'personal-data-phone',
        label: getMessage('targetPhone'),
        placeholder: formatMessage(targetFormsGeneralMessages.phonePlaceholder)
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'select',
      name: 'gender',
      options: {
        label: getMessage('gender'),
        clearable: false,
        placeholder: getMessage('genderPlaceholder'),
        items: [
          {
            id: 'male',
            label: getMessage('male')
          },
          {
            id: 'female',
            label: getMessage('female')
          }
        ],
        textField: 'label',
        valueField: 'id',
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: 'w-[95%]'
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'date',
      name: 'birthdate',
      options: {
        formatDisplay: 'dd/MM/yyyy',
        id: 'personal-data-birthdate',
        label: getMessage('birthDate'),
        placeholder: getMessage('birthDatePlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'age',
      options: {
        id: 'personal-data-age',
        label: getMessage('age'),
        placeholder: getMessage('agePlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'curp',
      options: {
        id: 'personal-data-curp',
        label: 'CURP',
        placeholder: getMessage('curpPlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'text',
      name: 'rfc',
      options: {
        id: 'personal-data-rfc',
        label: 'RFC',
        placeholder: getMessage('rfcPlaceholder')
      },
      breakpoints: { xs: 3 }
    },
    {
      type: 'city-selector',
      name: 'birth-address-selector',
      options: {
        countryName: 'birthCountry',
        countryLabel: getMessage('birthCountry'),
        countryPlaceholder: getMessage('birthCountryPlaceholder'),
        countryBreakpoints: { xs: 3 },
        stateName: 'birthState',
        stateLabel: getMessage('birthState'),
        statePlaceholder: getMessage('birthStatePlaceholder'),
        stateBreakpoints: { xs: 3 },
        cityName: 'birthCity',
        cityLabel: getMessage('birthCity'),
        cityPlaceholder: getMessage('birthCityPlaceholder'),
        cityBreakpoints: { xs: 3 },
        className: 'bg-white-500 mt-3',
        optionsContainerClassname: '!w-full'
      }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(getMessage('required'))
    })
    .concat(addressValidationSchema)

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const body: Record<string, any> = {
      unique_alias: values.alias,
      full_name: values.name,
      phone_number: values.targetNumber,
      gender: values.gender,
      age: values.age,
      country: values.birthCountry,
      state: values.birthState,
      town: values.birthCity
    }

    if (values.curp) body.curp = values.curp
    if (values.rfc) body.rfc = values.rfc
    if (values.birthdate) {
      body.birthday = format(new Date(values.birthdate), 'yyyy-MM-dd')
    }

    try {
      await actions.update(body)
      await actions.updateAddress({
        country: values.country,
        state: values.state,
        city: values.city,
        zip: values.zipCode,
        address_line_1: values.line1,
        address_line_2: values.line2
      })
      launchToast({
        title: formatMessage(targetFormMessages.updatedSuccessfully),
        type: 'Success'
      })
    } catch {}
  }

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
      enableReinitialize: true
    }),
    [initialValues]
  )

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: getMessage('actualAddress'),
        className: 'text-primary uppercase mt-2'
      },
      spacing: 1
    }
  ]

  const getValues = async (): Promise<void> => {
    try {
      const response = await actions.get()
      const addressResponse = await actions.getAddress()

      setInitialValues({
        alias: response.data.unique_alias ?? '',
        name: response.data.full_name ?? '',
        targetNumber: response.data.phone_number ?? '',
        gender: response.data.gender ?? '',
        birthdate: response.data.birthdate ?? '',
        age: response.data.age ?? '',
        curp: response.data.curp ?? '',
        rfc: response.data.rfc ?? '',
        birthCountry: response.data.country ?? '',
        birthState: response.data.state ?? '',
        birthCity: response.data.town ?? '',
        country: addressResponse.data.country ?? '',
        state: addressResponse.data.state ?? '',
        city: addressResponse.data.city ?? '',
        zipCode: addressResponse.data.zip ?? '',
        line1: addressResponse.data.address_line_1 ?? '',
        line2: addressResponse.data.address_line_2 ?? ''
      })
    } catch {}
  }

  useEffect(() => {
    getValues()
  }, [])

  return (
    <div className="w-full">
      <Typography variant="title" style="bold" className="uppercase mb-2">
        {getMessage('title')}
      </Typography>

      <div className="bg-white p-2 py-4 rounded-md max-h-[62vh] overflow-y-auto">
        <Form
          formikConfig={formikConfig}
          fields={fields}
          submitButtonPosition="right"
          submitButtonLabel={getGlobalMessage('save', 'actionsMessages')}
          submitButtonProps={{
            color: 'indigo',
            variant: 'contained'
          }}
          className="user-account-data-form"
          withSections={{
            renderMainSection: true,
            sections
          }}
        />
      </div>
    </div>
  )
}

export default PersonalDataForm

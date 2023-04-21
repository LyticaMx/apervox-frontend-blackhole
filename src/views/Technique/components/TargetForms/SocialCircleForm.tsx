import { ReactElement } from 'react'
import { AddressFormValues, useAddressForm } from './useAddressForm'
import { useIntl } from 'react-intl'
import { Field, Section } from 'types/form'
import { socialCircleFormMessages } from 'views/Technique/messages'
import * as yup from 'yup'
import { formMessages } from 'globalMessages'
import AccordionForm from './AccordionForm'

interface FormValues extends AddressFormValues {
  name: string
  activity: string
}

const SocialCircleForm = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { addressFields, addressValidationSchema } = useAddressForm('address')

  const fields: Array<Field<FormValues | AddressFormValues>> = [
    {
      type: 'text',
      name: 'name',
      options: {
        label: formatMessage(socialCircleFormMessages.name),
        placeholder: formatMessage(socialCircleFormMessages.namePlaceholder)
      },
      breakpoints: {
        xs: 12,
        md: 6
      }
    },
    {
      type: 'text',
      name: 'activity',
      options: {
        label: formatMessage(socialCircleFormMessages.activity),
        placeholder: formatMessage(socialCircleFormMessages.activityPlaceholder)
      },
      breakpoints: {
        xs: 12,
        md: 6
      }
    },
    ...addressFields
  ]

  const validationSchema = yup
    .object({
      name: yup.string().required(formatMessage(formMessages.required)),
      activity: yup.string().required(formatMessage(formMessages.required))
    })
    .concat(addressValidationSchema)

  const sections: Section[] = [
    {
      name: 'address',
      title: {
        text: formatMessage(socialCircleFormMessages.address),
        className: 'text-primary uppercase mt-2'
      }
    }
  ]

  return (
    <div>
      <AccordionForm
        fields={fields}
        validationSchema={validationSchema}
        title={formatMessage(socialCircleFormMessages.title).toUpperCase()}
        itemTitle={formatMessage(socialCircleFormMessages.itemTitle)}
        withSections={{ renderMainSection: true, sections }}
      />
    </div>
  )
}

export default SocialCircleForm
